export enum webServices {
    byName ="name",
    bySerialNumber="serialNumber",
    byVehicleNumber="vehicleNumber",
    startDate="name",
    byPolicyNumber="policyNumber",
    byPhoneNumber="phoneNumber",
    byEmailId="emailId"
}

export enum description {
    "Serial #" ="bySerialNumber",
    "Name" ="byName",
    "Vehicle #" ="byVehicleNumber",
    "Policy Issue Date" ="startDate",
    "Policy #" ="byPolicyNumber",
    "Telephone #" ="byPhoneNumber",
    "Email Address" ="byEmailId"
}

export enum searchKeyboardType {
    "Serial #" = "url",
    "Name" = "url",
    "Vehicle #" = "number",
    "Policy Issue Date" = "datetime",
    "Policy #" = "url",
    "Telephone #" = "phone",
    "Email Address" = "email"
}