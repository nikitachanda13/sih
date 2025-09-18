# FloatChat :  AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization

An AI-powered oceanographic data analysis platform for ARGO float data with ultra-fast Groq LLM integration and interactive visualizations.

## Features

- **NetCDF Data Ingestion**: Process ARGO float NetCDF files and convert to structured formats
- **Dual Database System**: PostgreSQL for relational data, FAISS for vector embeddings
- **AI-Powered Queries**: Natural language processing using Groq API with RAG pipeline
- **Interactive Visualizations**: Geospatial maps, depth-time plots, and profile comparisons
- **Chat Interface**: Ask questions about oceanographic data in natural language
- **Real-time Data Explorer**: Browse and filter ARGO float measurements

## Technology Stack

- **Frontend**: HTML,CSS,JAVASCRIPT
- **AI/ML**: Groq API, LangChain
- **Database**: PostgreSQL, Vector Database (FAISS)
- **Data Processing**: xarray, pandas, netCDF4
- **Visualization**: Plotly
- **Data Format**: NetCDF, Parquet

## Prerequisites

- Python 3.8+
- Groq API key

## Installation

1. Clone or download this repository
2. Install required packages:
   ```bash
   pip install streamlit groq langchain-groq  xarray pandas plotly numpy chromadb netcdf4
   ```




