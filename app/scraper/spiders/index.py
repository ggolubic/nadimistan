import scrapy
import logging
import datetime

from ..items import BaseOglasItemIndex


class IndexSpider(scrapy.Spider):
    def __init__(self, pagination):
        self.name = "index"
        self.pagination = pagination

    name = "index"
    url_base = "https://www.index.hr"
    scrape_type = "/najam-stanova"
    allowed_domains = ["index.hr"]
    start_urls = ["https://www.index.hr/oglasi/najam-stanova/gid/3279?elementsNum=10"]

    def start_requests(self):
        urls = ["https://www.index.hr/oglasi/najam-stanova/gid/3279?elementsNum=10"]
        for url in urls:
            yield scrapy.Request(
                url, callback=self.parse, cb_kwargs={"limited_pages": self.pagination}
            )

    def parse(self, response, limited_pages):

        links_oglasi = response.xpath(
            '//div[@class="results"]/div[@class="OglasiRezHolder"]/a/@href'
        ).extract()

        for link in links_oglasi:
            yield scrapy.Request(link, callback=self.parse_oglas)

        pagination = response.xpath(
            '//div[@class="page_nav"]/ul/li/a[text()[contains(.,">")]]/@href'
        ).extract_first()

        if pagination:
            if limited_pages and int(pagination[-1]) >= limited_pages:
                return
            next_page = f"{self.url_base}{pagination}"
            yield scrapy.Request(
                next_page, self.parse, cb_kwargs={"limited_pages": self.pagination}
            )

    def parse_oglas(self, response):
        oglas = BaseOglasItemIndex()

        scraped = datetime.datetime.now()
        title = response.xpath('//div[@class="likeH1"]/text()').extract_first().strip()
        cijena = (
            response.xpath(
                '//div[@id="PrintOglasContent"]/div/div[@class="price"]/text()[2]'
            )
            .extract_first()
            .strip()
        )

        objavljen = response.xpath(
            '//div[@class="published"]/text()[contains(.,"Objavljen")]'
        ).extract_first()
        objavljen = objavljen.split("|")[1][11:].strip()
        description = response.xpath(
            '//div[@class="oglas_description"]/text()'
        ).extract()
        opis = " ".join(description)
        table_info = response.xpath('//div[contains(@class,"features_list")]/div/ul')

        dir = {}

        for row in table_info:
            name = row.xpath(".//li/text()").extract_first().lower().replace(" ", "_")
            value = (
                row.xpath(".//li[2]/text()").extract_first().lower().replace("\r\n", "")
            )
            dir[name] = value

        oglas["link"] = response.url
        oglas["title"] = title
        oglas["scraped"] = scraped
        oglas["objavljen"] = objavljen
        oglas["cijena"] = cijena
        oglas["opis"] = opis

        oglas["zupanija"] = dir.get("županija", "")
        oglas["grad"] = dir.get("grad/općina", "")
        oglas["naselje"] = dir.get("naselje", "")
        oglas["broj_soba"] = dir.get("broj_soba", "")
        oglas["m2"] = dir.get("stambena_površina_u_m2", "")
        oglas["namjesten"] = dir.get("namještenost", "")
        oglas["kat"] = dir.get("kat", "")
        oglas["parking"] = dir.get("rezerviranih_parking_mjesta", "")
        oglas["orijentacija"] = dir.get("orijentacija", "")
        oglas["dostupno_od"] = dir.get("dostupno_od", "")
        oglas["rezije"] = dir.get("režije", "")
        oglas["mail"] = dir.get("email", "")
        oglas["contact"] = dir.get("tel_ili_mobitel", "")

        return oglas
