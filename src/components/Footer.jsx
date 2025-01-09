const Footer = () => (
<footer style={{padding: '20px', textAlign: 'center', fontSize: '14px', color: '#fff', borderTop: '1px solid #ddd' }}>
  <div>
    <span>&copy; 2024 Työpaikka Haku</span>
  </div>
  <div style={{ marginTop: '10px' }}>
    <p>
      <strong>Osoite:</strong> SatuKatu 1, 00100 Helsinki, Suomi<br />
      <strong>Puhelin:</strong> +358 50 123 4567<br />
      <strong>Sähköposti:</strong>{' '}
      <a href="mailto:info@tyopaikkahaku.fi" style={{ textDecoration: 'none' }}>
        info@tyopaikkahaku.fi
      </a>
    </p>
  </div>
  <div style={{ marginTop: '10px' }}>
    <p>
      <strong>Seuraa meitä:</strong>
      <br />
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{  textDecoration: 'none', marginRight: '10px' }}>
        Facebook
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '10px' }}>
        LinkedIn
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        Twitter
      </a>
    </p>
  </div>
</footer>

  )

export {Footer};