# Car Park
A simple web app to demonstrate API and frontend.

## Install and Exec

    git clone https://github.com/mfferreira/carpark.git

#### API
	
    cd carpark/api
    npm install
    node index.js cars.xml
    
#### Frontend
    cd carpark/frontend
    npm install
    npm run dev

## API Endpoints
#### GET /parkinglots
All cars in all parking lots.

#### GET /parkinglots/:lotid/cars/:hours
All cars in `:lotid` lot. It also adds the value and discount calculated with `:hours`.

#### GET /inventory/:hours
Summary of value and discount calculated with `:hours` for all lots.

#### POST /parkinglots/:lotid/cars
Add car to `:lotid` lot. Payload example:

	{
    brand: 'BMW',
    licenseplate: '99aa99',
    parkingtime: '1984-02-28T09:03:00+00:00',
    }
