import response from './../response'

exports.index = (req, res) => {
    response.status('Hello REST API NODEJS', res)
}