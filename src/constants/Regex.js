export const REGEX = {
    EMAIL: /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g,
    NUMBER: /^[0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\s]*$/,
    PINCODE: /^[1-9][0-9]{5}$/,
    PHONNUMBER: /^[6-9]\d{9}$/
}
