export const messages = {
    /**
     * 
     * @param {Object} location 
     * @param {String} name 
     * @param {String} situation
     */
    defaultSos (location, name, situation) {  ` 
        Last Map cordinates: lat: ${location.latitude} long: ${location.longitude}
        Help Reach out to ${name} and make sure he/her is fine

        This is an SOS Call and a case of ${situation}.
        Help save a live today.
    `}
}