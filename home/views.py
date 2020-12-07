import json

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# from .weatherModels import WeaTest
# Create your views here.
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
# Receiving Data from AJAX
def searchForm(request):
    form_data_dict = {}
    form_data_list = json.loads(request.POST.get('formData', None))
    for field in form_data_list:
        form_data_dict[field["name"]] = field["value"]
    print(form_data_dict)
    return render(request, 'index.html')

def index(request):
    from django.conf import settings
    context = {
        'api_key' : settings.GOOGLE_SECRET_KEY
    }
    print(context)
    request.data = context
    return render(request, 'index.html', context)

def table(request):
    data = {"data": [
        {
            "Company": "UPS",
            "Service": "Saver",
            "Money": "1552.60",
        },
        {
            "Company": "Fedex",
            "Service": "Worldwide Expedited",
            "Money": "932.72",
        },
    ]
    }
    return JsonResponse(data)

start = False

def shipping_api(data):
    from home.api import ups, fedex, usps, sendle
    from home.tests import integration_test, bcolors
    global start

    # print the input data.
    # print("input data : ", data)

    # call ups api.
    result_ups = ups(data)
    print("result_ups : ", (bcolors.FAIL + ' No service. ' + bcolors.ENDC) if result_ups == [] else (bcolors.OKGREEN + ' Success. ' + bcolors.ENDC))

    # call fedex api.
    result_fedex = fedex(data)
    print("result_fedex : ", (bcolors.FAIL + ' No service. ' + bcolors.ENDC) if result_fedex == [] else (bcolors.OKGREEN + ' Success. ' + bcolors.ENDC))

    # call usps api.
    result_usps = usps(data)
    print("result_usps : ", (bcolors.FAIL + ' No service. ' + bcolors.ENDC) if result_usps == [] else (bcolors.OKGREEN + ' Success. ' + bcolors.ENDC))

    # call sendle api.
    result_sendle = sendle(data)
    print("result_sendle : ", (bcolors.FAIL + ' No service. ' + bcolors.ENDC) if result_sendle == [] else (bcolors.OKGREEN + ' Success. ' + bcolors.ENDC))

    # Run integration test.
    if (start == False):
        integration_test(data, result_ups, result_fedex, result_usps, result_sendle)
        start = True

    rst_dict = {"data": result_ups + result_fedex + result_usps + result_sendle}

    return rst_dict
    # return HttpResponse(result)

def input(request):  # This function is get data from web and call api then return the data to web.
    
    def inputtojson(input):
        
        data = {
            "Dimension units": input['Dimension_units'],
            "Height": input['Height'],
            "Length": input['Length'],
            "Width": input['Width'],
            "Weight unit": input['Weight_unit'],
            "Weight": input['Weight'],
            "ShipFrom": {
                "Address": {
                    "AddressLine": input['From_AddressLine'],
                    "City": input['From_City'],
                    "CountryCode": input['From_CountryCode'],
                    "PostalCode": input['From_PostalCode'],
                    "StateProvinceCode": input['From_StateProvinceCode']
                }
            },
            "ShipTo": {
                "Address": {
                    "AddressLine": input['To_AddressLine'],
                    "City": input['To_City'],
                    "CountryCode": input['To_CountryCode'],
                    "PostalCode": input['To_PostalCode'],
                    "StateProvinceCode": input['To_StateProvinceCode']
                }
            }
        }
        return data

    # request.GET can get the data from web.
    inputdata = request.GET

    # change the web data to json.
    inputdata = inputtojson(inputdata)
    
    # call the ups api and get response data.
    result = shipping_api(inputdata)

    # test data.
    # result = {"data": [
    #     {
    #         "Company": "UPS",
    #         "Service": "Saver",
    #         "Money": "$ 1552.60",
    #         "Time" : "1 Day",
    #     },
    #     {
    #         "Company": "Fedex",
    #         "Service": "Worldwide Expedited",
    #         "Money": "$ 932.72",
    #         "Time" : "2 Day",
    #     },
    # ]
    # }
    return JsonResponse(result)
