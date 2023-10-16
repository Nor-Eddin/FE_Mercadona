export interface productDTO {
    IdProduct: number
    ProductName: string
    DescriptionProduct: string
    Price: number
    Image: string
    Category: string
    Promotion:string
    
}

export interface landingPageDTO {
    catalogueProduct?: productDTO[];
}