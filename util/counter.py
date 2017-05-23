from PyPDF2 import PdfFileReader
import os
import psycopg2
media = "/home/broadwayites/media.yoreanaheim.com"
slugs = [
    'anaheim-gazette',
    'anaheim-bulletin',
    'oc-plain-dealer',
    'anaheim-daily-herald' ]
conn = psycopg2.connect(os.environ['DATABASE_URL'])

for slug in slugs:
    for root, dirs, files in os.walk(media +"/"+ slug):
            for file in files:
                    path = root +'/'+ file
                    url = "http://"+ path.replace("/home/broadwayites/", "")
                    fo = open(path,'rb')
                    pdf = PdfFileReader(fo)
                    pages = pdf.getNumPages()
                    fo.close()

                    cur = conn.cursor()
                    cur.execute("UPDATE editions SET pages=(%s) WHERE pdf = (%s)", (pages,url,));
                    conn.commit()
                    cur.close()

                    print(path, pages)

conn.close()
