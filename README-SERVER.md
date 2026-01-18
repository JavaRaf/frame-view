# Servidor Local para Testes

Este projeto inclui um servidor HTTP simples em Python para testar localmente.

execute o servidor com python:
```bash
python server.py
```

## Acessar o Projeto

Após iniciar o servidor, acesse:

- **Desktop**: http://localhost:8000/desktop/
- **Mobile**: http://localhost:8000/mobile/

## Alterar a Porta

Se a porta 8000 estiver em uso, edite o arquivo `server.py` e altere a variável `PORT`:

```python
PORT = 8000  # Altere para outra porta, ex: 8080
```

## Parar o Servidor

Pressione `Ctrl+C` no terminal onde o servidor está rodando.

## Requisitos

- Python 3.x (recomendado) ou Python 2.7
- Nenhuma dependência adicional necessária para funcionamento básico (usa apenas bibliotecas padrão do Python)

## Auto-reload (Opcional)

O servidor suporta recarregamento automático quando arquivos são modificados. Para habilitar esta funcionalidade:

1. Instale o `watchdog`:
```bash
pip install watchdog
```
