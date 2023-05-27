export interface User {
    id: string;
    given_name: string;
    family_name: string;
    email: string;
}

export interface Contact {
    id: string;
    given_name: string;
    family_name: string;
    email: string;
    met_at_location: string;
    notes?: string;
}

export interface Integration {
    id: string;
    name: string;
    description: string;
    logo: string;
    enabled: boolean;
}

export enum FieldValidationsTypes {
    CLIENT_ID = "CLIENT_ID",
    CLIENT_SECRET = "CLIENT_SECRET",
}

export interface IntegrationField {
    id: string;
    integrationId: string;
    name: string;
    label: string;
    description?: string;
    type: "text" | "email" | "fieldMapping";
    required: boolean;
    validations?: FieldValidationsTypes;
}

const integrations: Integration[] = [
    {
        id: "1234",
        name: "Salesforce",
        description: "Sample description about our integration with Salesforce",
        logo: "/integrations/logos/salesforce.svg",
        enabled: true,
    },
    {
        id: "1235",
        name: "Zapier",
        description:
            "Sample description about what we offer in terms of Zapier",
        logo: "/integrations/logos/zapier.svg",
        enabled: true,
    },
    {
        id: "1236",
        name: "HubSpot",
        description: "Sample description about Hubspot integration",
        logo: "/integrations/logos/hubspot.svg",
        enabled: true,
    },
];

const integrationFields: IntegrationField[] = [
    {
        id: "1",
        integrationId: "1234",
        name: "client_id",
        label: "Client ID",
        description: "Details about how the user can get this info.",
        type: "text",
        required: true,
        validations: FieldValidationsTypes.CLIENT_ID,
    },
    {
        id: "2",
        integrationId: "1234",
        name: "client_secret",
        label: "Client Secret",
        description: "Details about how the user can get this.",
        type: "text",
        required: true,
        validations: FieldValidationsTypes.CLIENT_SECRET,
    },
    {
        id: "3",
        integrationId: "1235",
        name: "client_id",
        label: "Client ID",
        description: "Details about what the purpose of this field is.",
        type: "text",
        required: true,
        validations: FieldValidationsTypes.CLIENT_ID,
    },
    {
        id: "4",
        integrationId: "1236",
        name: "tenant_domain",
        label: "Tenant Domain",
        type: "text",
        required: true,
    },
    {
        id: "5",
        integrationId: "1236",
        name: "client_id",
        label: "Client ID",
        type: "text",
        required: true,
        validations: FieldValidationsTypes.CLIENT_ID,
    },
    {
        id: "6",
        integrationId: "1236",
        name: "client_secret",
        label: "Client Secret",
        type: "text",
        required: true,
        validations: FieldValidationsTypes.CLIENT_SECRET,
    },

    {
        id: "7",
        integrationId: "1236",
        name: "field_mappings",
        label: "Field Mappings",
        type: "fieldMapping",
        required: true,
    },
];

export class Database {
    public static getUser(): User {
        return {
            id: "12345",
            given_name: "Jane",
            family_name: "Doe",
            email: "jane@blinq.me",
        };
    }

    public static getContacts(): Contact[] {
        return [
            {
                id: "1234",
                given_name: "Terry",
                family_name: "Walker",
                email: "terry@waffles.co",
                met_at_location: "Melbourne, Australia",
                notes: "Terry has a beard.",
            },
            {
                id: "1235",
                given_name: "Terry",
                family_name: "Walker",
                email: "terry@waffles.co",
                met_at_location: "Melbourne, Australia",
                notes: "Terry has a beard.",
            },
        ];
    }

    public static getIntegrations(active: boolean = true): Integration[] {
        return active
            ? integrations.filter((integration) => integration.enabled)
            : integrations;
    }

    public static getIntegration(id: string): Integration | undefined {
        return integrations.find((integration) => integration.id === id);
    }

    public static getIntegrationFields(
        integrationId: string
    ): IntegrationField[] {
        return integrationFields.filter(
            (field) => field.integrationId === integrationId
        );
    }
}
