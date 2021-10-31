## Corrección para inclusión de SQS en el Step Functions

- En el archivo serverless.ts, modiqué la línea 128

```
Resource: 'arn:aws:states:::sqs:sendMessage',
```

- Agregué un lambda más llamado "step04" para recibir los mensajes del SQS. Noten que ese lambda tiene un evento de tipo sqs para recibir los mensajes
