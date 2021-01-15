export interface CarsBrands {
    key: string, 
    id: number, 
    fipe_name: string, 
    name: string
}

export interface CarsByBrand {
    key: string, 
    name: string, 
    id: string, 
    fipe_name: string
}

export interface CarsModels {
    fipe_codigo: string, 
    name: string, 
    key: string, 
    veiculo: string, 
    id: string
}

export interface Car {
    id: string,
    ano_modelo: string,
    marca: string,
    name: string,
    veiculo: string,
    preco: string,
    combustivel: string,
    referencia: string,
    fipe_codigo: string,
    key: string
}
