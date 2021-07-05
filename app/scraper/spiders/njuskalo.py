import scrapy
import logging
import datetime

from ..items import BaseOglasItem


class StanoviSpider(scrapy.Spider):
    name = "njuskalo"
    url_base = "http://www.njuskalo.hr"
    scrape_type = "/iznajmljivanje-stanova"
    allowed_domains = ["njuskalo.hr"]
    db_name = "stan_rent"
    start_urls = ["https://www.njuskalo.hr/iznajmljivanje-stanova/splitsko-dalmatinska"]

    custom_settings = {
        "FEED_FORMAT": "csv",
        "FEED_URI": "test.csv",
        "FEED_EXPORT_FIELDS": [
            "link",
            "scraped",
            "cijena",
            "opis",
            "objavljen",
            "zupanija",
            "grad",
            "kvart",
            "kat",
            "broj_soba",
            "parking",
        ],
    }

    def parse(self, response):

        links_oglasi = response.xpath(
            '//ul[@class = "EntityList-items"]/li/article/h3/a/@href'
        ).extract()
        for link in links_oglasi:
            if link[:12] == "/nekretnine/":
                yield scrapy.Request(self.url_base + link, callback=self.parse_oglas)
            else:
                logging.info(f"Rejecting link: {link}")

        pagination = response.xpath(
            '//li[contains(@class, "Pagination-item--next")]/button/@data-page'
        ).extract_first()
        print("STRANICA", pagination)
        if pagination:
            next_page = (
                f"{response.url[:-1]}{pagination}"
                if response.url[-1].isdigit()
                else f"{response.url}?page={pagination}"
            )
            yield scrapy.Request(next_page, callback=self.parse)

    def parse_oglas(self, response):

        item = BaseOglasItem()

        item["link"] = response.url
        item["tip"] = self.name
        item["scraped"] = datetime.datetime.now()
        item["opis"] = (
            response.xpath('//div[@class="ClassifiedDetailDescription-text"]/text()')
            .extract_first()
            .strip()
        )

        # table parsing
        cijena = (
            response.xpath(
                '//dd[@class = "ClassifiedDetailSummary-priceDomestic"]/text()'
            )
            .extract_first()
            .strip()
            .split("&nbsp;")
        )
        lokacija = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Lokacija"]]/following-sibling::dd[1]/span/text()'
        ).extract_first()

        zupanija, grad, kvart = lokacija.split(",")

        item["cijena"] = cijena
        item["objavljen"] = response.xpath(
            '//dt[text()[normalize-space() = "Oglas objavljen" ]]/following-sibling::dd[1]/text()'
        ).extract_first()

        item["zupanija"] = zupanija
        item["grad"] = grad.strip()
        item["kvart"] = kvart.strip()
        item["broj_soba"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Tip stana"]]/following-sibling::dd[1]/span/text()'
        ).extract()
        item["kat"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Kat"]]/following-sibling::dd[1]/span/text()'
        ).extract()
        item["m2"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Stambena površina"]]/following-sibling::dd[1]/span/text()'
        ).extract()
        item["parking"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Broj parkirnih mjesta"]]/following-sibling::dd[1]/span/text()'
        ).extract()

        return item
