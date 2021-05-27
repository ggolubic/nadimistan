from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def start_spider(name):

    process = CrawlerProcess(get_project_settings())
    process.crawl(name)
    process.start()
