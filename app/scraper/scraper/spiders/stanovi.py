import scrapy

# from scrapy import log
import datetime
from scraper.items import BaseOglasItem


class StanoviSpider(scrapy.Spider):
    name = "stanovi"
    url_base = "http://www.njuskalo.hr"
    scrape_type = "/iznajmljivanje-stanova"
    allowed_domains = ["njuskalo.hr"]
    db_name = "stan_rent"
    # start_urls = [url_base + scrape_type]
    start_urls = [
        "https://www.njuskalo.hr/nekretnine/stan-split-77.00-m2-oglas-32930504"
    ]

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
            "ulica",
            "kat",
            "broj_soba",
            "parking",
        ],
    }

    # def parse(self, response):

    #     zup = response.xpath(
    #         u'//div[@class = "CategoryListing-topCategories"]//li/a/@href'
    #     ).extract()

    #     for z in zup:
    #         yield scrapy.Request(self.url_base + z, callback=self.oglasi_links)

    # def oglasi_links(self, response):

    #     links_oglasi = response.xpath(
    #         '//ul[@class = "EntityList-items"]/li/article/h3/a/@href'
    #     ).extract()

    #     for link in links_oglasi:
    #         if link[:12] === "/nekretnine/":
    #             yield scrapy.Request(self.url_base + link, callback=self.parse_oglas)
    #         else:
    #             log.msg("Rejecting link: %s" % link, level=log.INFO)

    #     # pagination = response.xpath(
    #     #     '//a[text() = "Sljede\u0107a\xa0"]/@href')
    #     pagination = response.xpath('//li[@class="Pagination-item--next"]/button/@data-href').extract()

    #     if pagination:
    #         yield scrapy.Request(pagination, callback=self.oglasi_links)

    # def parse_oglas(self, response):
    def parse(self, response):

        item = BaseOglasItem()

        item["link"] = response.url
        item["tip"] = self.name
        item["scraped"] = datetime.datetime.now()
        item["opis"] = response.xpath(
            '//div[@class="ClassifiedDetailDescription-text"]/text()'
        ).extract()

        # table parsing
        cijena = (
            response.xpath(
                '//dd[@class = "ClassifiedDetailSummary-priceDomestic"]/text()'
            )
            .extract_first()
            .trim()
            .split("&nbsp;")
        )
        item["cijena"] = cijena
        item["objavljen"] = response.xpath(
            '//dt[text()[normalize-space() = "Oglas objavljen" ]]/following-sibling::dd[1]/text()'
        ).extract_first()
        item["zupanija"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Lokacija"]]/following-sibling::dd[1]/span/text()'
        ).extract_first()
        item["grad"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Lokacija"]]/following-sibling::dd[1]/span/text()'
        ).extract_first()
        item["ulica"] = response.xpath(
            '//dt[@class="ClassifiedDetailBasicDetails-listTerm"][span[text()="Ulica"]]/following-sibling::dd[1]/span/text()'
        )
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
