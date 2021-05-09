from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def start_spider(name):

    process = CrawlerProcess(get_project_settings())
    process.crawl(name)
    process.start()


if __name__ == "__main__":

    # Start spiders, process.start() blocks untill finished
    # Run in parallel (have to swich database to mysql)
    start_spider("stanovi")
    # start_spider('rent_kuca')
    # start_spider('prodaja_kuca')
    # start_spider('prodaja_stan')
