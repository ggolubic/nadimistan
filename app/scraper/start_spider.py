from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def start_spider(name, **kwargs):
    process = CrawlerProcess(get_project_settings())
    process.crawl(name, **kwargs)
    process.start()

if __name__ == "__main__":
    start_spider()