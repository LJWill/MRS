import pandas as pd
import requests as rq
from io import BytesIO
from PIL import Image

class ImageDetail:
    def image_request(self, read_path, write_path):
        result = pd.DataFrame()
        movie_image = pd.read_csv(read_path)
        # print(movie_image['backdrops'])
        total = movie_image.shape[0]
        i = 0
        for backdrops in movie_image['backdrops']:
            images = backdrops.split(',')
            url_front = 'https://image.tmdb.org/t/p/original'
            for image_path in images:
                url = url_front + image_path
                r = rq.get(url)
                bytes_stream = BytesIO(r.content)
                roiimg = Image.open(bytes_stream)
                # roiimg.show()
                imgByteArr = BytesIO()
                roiimg.save(imgByteArr, format('PNG'))
            #     print(r.content)
            #     json_file = r.json()
            #     temp = json_file.get("status_code")
            #     if temp is not None:
            #         continue
            #     result = self.create_df(json_file, result)
            # print("\r" + 'processing %d out of %d items...' % (i + 1, total), end='')
            # i += 1
        result = result.reset_index(drop=True)
        result.to_csv(write_path)


if __name__ == '__main__':
    md = ImageDetail()
    read_path = 'Data/ImageTest/movieImage.csv'
    write_path = 'Data/ImageTest/1.csv'
    md.image_request(read_path, write_path)
