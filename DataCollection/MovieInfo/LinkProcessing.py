import pandas as pd
import requests as rq

class LinkProcessing:

    def padding(self, x):
        temp = str(int(x))
        lens = len(temp)
        if lens < 7:
            for i in range(0, 7-lens):
                temp = "0" + temp
                # print(i)
        temp = "tt" + temp
        return temp

    def float_int(self, x):
        return int(x)

    def read_link_file(self, old_path, new_path, write_path):
        link = pd.read_csv(old_path)
        new_link = pd.read_csv(new_path)
        result = link.merge(new_link, how='left', on='imdbId')
        result = result.drop(['Unnamed: 0_y', 'Unnamed: 0_x'], axis=1)
        result['tmdbId'] = result['tmdbId'].map(self.float_int)
        print(result)


if __name__ == '__main__':
    old_path = 'Data/oldLinkTest.csv'
    new_path = 'Data/newLinkTest.csv'
    write_path = 'Data/linkResult.csv'
    lp = LinkProcessing()
    lp.read_link_file(old_path, new_path, write_path)
