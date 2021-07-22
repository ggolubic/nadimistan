from scrapy.crawler import CrawlerProcess, CrawlerRunner
from scrapy.utils.project import get_project_settings


def start_spider(name, **kwargs):
    process = CrawlerRunner(get_project_settings())
    process.crawl(name, **kwargs)
