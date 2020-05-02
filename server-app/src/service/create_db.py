# TODO remove this file once umongo is stable

db.createCollection("project", {
    validator: {$jsonSchema: {
        bsonType: "object",
        required: ["projectId", "name", "owner", "sampleIds", "description", "createdDate", "updatedDate", "isLocked"],
        properties: {
            name: {
                  bsonType: "string",
                description: "must be a string and is required"
            },
            projectId: {
                bsonType: "int",
                description: "must be an integer and is required"
            },
            sampleIds: {
                bsonType: "array",
                description: "must be an array if the field exists"
            },
            description: {
                bsonType: ["string"],
                description: "must be a string if the field exists"
            },
            owner: {
                bsonType: "object",
                required: ["name"],
                properties: {
                    name: {
                          bsonType: "string",
                          description: "must be a string if the field exists"
                    },
                    orcid: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    }
                }
            },
            createdDate: {
                bsonType: ["date"],
                description: "must be a date if the field exists"
            },
            updatedDate: {
                bsonType: ["date"],
                description: "must be a date if the field exists"
            },
            isLocked: {
                bsonType: "bool",
                description: "must be a boolean and is required"
            },
        }
    }
    }
})
