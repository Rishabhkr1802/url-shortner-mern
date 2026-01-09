import { useState } from 'react';

const baseUrl = import.meta.env.MODE === "development" ? import.meta.env.VITE_SERVER_URL : "";

function App() {
  const [longUrl, setLongUrl]    = useState('');
  const [shortUrl, setShortUrl]  = useState('');
  const [loading, setLoading]    = useState(false);
  const [error, setError]        = useState('');
  const [copied, setCopied]      = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const res = await fetch(`${baseUrl}/api/v1/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to shorten URL');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-100 vh-100 container-fluid py-5 bg-light">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-8 col-md-10 col-sm-10">
          <div className="card shadow-lg rounded p-4">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">🔗 URL Shortener</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="urlInput" className="form-label">Enter Long URL</label>
                  <input type="url" id="urlInput" className="form-control" placeholder="https://example.com/long-url" value={longUrl} required
                    onChange={(e) => setLongUrl(e.target.value)} />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Shortening...' : 'Make URL Short'}
                  </button>
                </div>
              </form>

              {error &&  <div className="alert alert-danger mt-3" role="alert">{error}</div> }

              {shortUrl && (
                <div className="mt-4">
                  <label className="form-label">Short URL</label>
                  <div className="input-group">
                    <input type="text" className="form-control" value={shortUrl} readOnly />
                    <button className={`btn ${copied ? 'btn-success' : 'btn-outline-primary'}`} type="button" onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>

      <footer className="position-absolute bottom-0 text-center w-100  mb-4">Design & Developed by <strong>Rishabh Kumar</strong></footer>

    </div>
    
  );
}

export default App;
