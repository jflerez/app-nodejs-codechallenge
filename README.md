# Tech Stack

<ol>
  <li>NestJS (Typescript) </li>
  <li>Typeorm</li>
  <li>Kafka</li>
  <li>PostgreSQL</li> 
  <li>GraphQL (Apollo)</li>
  <li>Redis</li> 
</ol>

## Instalación local
Para ejecutar localmente se deben seguir los siguientes pasos:

```sh
npm install
docker compose up -d
```
Seguido a esto podemos observar en la siguiente [Documentación servicios](https://documenter.getpostman.com/view/3411753/2sA3Bq4WZm) la manera de consumir el api de graphql


## Tipos de transacciones

A continuación se detallan los tranferTypeId configurados en el flujo de registro de transacción:

| tranferTypeId | Descripcion |
| ------ | ------ |
| 1 | Tarjeta de Crédito |
| 2 | Tarjeta de Débito |
| 3 | Transferencia Bancaria |
| 4 | Billetera Electrónica|