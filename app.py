#------flask libraries code-------------------
from flask import Flask,render_template,request,jsonify,make_response , send_file,redirect
import io
import requests
import pandas as pd
import numpy as np
import os
#------flask libraries code end----------------

from download_pdf import *
from scrapper import *

#-------scraper libraries code ----------------

import warnings
warnings.filterwarnings('ignore')

from bs4 import BeautifulSoup
from pprint import pprint
import time
#------scraper libraries code end-------------



#-----flask app code-----------
app = Flask(__name__)
#-----flask app code end-------

#----routing landing page--------------------------------
@app.route('/')
def home():
    #call scrapper to get data/df in return
    #dff = scrap()
    return render_template('index.html')
    
#----routing pdfViewer code----------------------------------

@app.route('/pdfViewer')
def pdfviewer():
    return render_template('pdf.html')
    #return send_file("static\downloads\Consolidated.pdf",as_attachment=True)  
#----routing pdfViewer code----------------------------------

@app.route('/downloadpdf')
def downloadpdf():
    return send_file("static\downloads\Consolidated.pdf",as_attachment=True)      
    
#----routing file clear code----------------------------------

@app.route('/clear', methods=['GET', 'POST'])
def clear():
    os.unlink("static\downloads\Consolidated.pdf")
    print('Consolidated removed')
    return redirect("/")
   
#----routing scrap code----------------------------------
@app.route('/scrap', methods=['GET', 'POST'])
def scrapfirst():
    if request.method == "POST":
        try:
            url = request.form['scrapURLinput']
            #comment this line once scrapper is working
            dff = pd.read_csv("frendy_grocery.csv", index_col=False)
            CatDict = []
            superCat = dff['SuperCategory'].unique()
            superCat = superCat.tolist()
            for Scat in superCat:
                for cat in dff[dff['SuperCategory']==Scat]['Category'].unique():
                    CatDict.append({'cat':cat,'Scat':Scat.replace('&', 'And')})
            catlist = []
            for i in range(len(CatDict)):
                catlist.append(CatDict[i]['cat'])
            responseDF = showItems(catlist,'OH2L')
            res = make_response(jsonify({"Cat" : CatDict ,"superCat" : superCat , "data" : responseDF}),200)
        except:
            res = make_response(jsonify({"Cat": 'error',"superCat": 'error', "data": 'error'} , 200))
    return res

#----routing filter code----------------------------------
@app.route('/filter', methods=['GET', 'POST'])
def filter():
    if request.method == "POST":
        try:    
            catlist = []
            req = request.form['CatList']
            sortby = request.form['sortby']
            catlist = req.split(",")
            responseDF = showItems(catlist,sortby)
            res = make_response(jsonify({ "data" : responseDF}),200)
        except:
            res = make_response(jsonify({"data": error} , 200))
    
    return res
    
#----routing download code----------------------------------
@app.route('/downloadPDF', methods=['GET', 'POST'])
def Download_PDF():
    if request.method=="POST":
        
        req = request.form['itemList']
        bg_color = request.form['bg_color']
        print(bg_color)
        itemList = req.split(",")
        data = pd.read_csv('frendy_grocery.csv')
        data.rename( columns={'Unnamed: 0':'Index'}, inplace=True )
        testDF = data[data['Index'].isin(itemList)]
        message = downloadPDF(testDF,bg_color)
        alert = "success"
        try :
            a ="a"
        except:
            message= "not working"
            alert = "danger"
    res = make_response(jsonify({"message": message , "alert" : alert}),200 )
    
    return res

#----routing download code end------------------------------

def showItems(catlist , sortby):
    catlist = catlist
    dff = pd.read_csv("frendy_grocery.csv", index_col = False)
    responseDF = []
    df = dff[dff['Category'].isin(catlist)]
    if sortby == 'H2L':
        df = df.sort_values(by='Price', ascending=False)
    if sortby == 'L2H':
        df = df.sort_values(by='Price', ascending=True)
    if sortby == 'OH2L':
        df = df.sort_values(by='discount', ascending=False)
    if sortby == 'OL2H':
        df = df.sort_values(by='discount', ascending=True)
    for index, row in df.iterrows():
        responseDF.append({
            'Index':row['Unnamed: 0'],
            'Item':row['Item'],
            'Price':row['Price']
            
            })
    return responseDF

if __name__=='__main__':
    app.run(debug=True)