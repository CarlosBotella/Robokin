// define the service to be called
let service = new ROSLIB.Service({
    ros : ros,
    name : '/nombre_del_servicio',
    serviceType : 'rossrv/Type',
})

// define the request
let request = new ROSLIB.ServiceRequest({
    param1 : 123,
    param2 : 'example of parameter',
  }) 

// define a callback
service.callService(request, (result) => {
    console.log('This is the response of the service ')
    console.log(result)

}, (error) => {
    console.error(error)
})