import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>¡Ups! Algo salió mal</h1>
      <p>{error.message || 'Ha ocurrido un error inesperado'}</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="btn btn-primary"
      >
        Volver al inicio
      </button>
    </div>
  );
}