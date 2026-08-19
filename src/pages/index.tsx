import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="/img/caveman-logo-banner.png" alt="Caveman Ecosystem Logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px', marginBottom: '1rem' }} />
        <Heading as="h1" className="hero__title" style={{ display: 'none' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/caveman/">
            Get Started ⛏️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main style={{display: 'flex', justifyContent: 'center', padding: '3rem 0'}}>
        <div className="container" style={{maxWidth: '860px'}}>
          <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
            <h2>The Whole Cave</h2>
            <p>Ecosystem maturity tiers and status across tools and packages.</p>
          </div>
          <div className="table-responsive" style={{display: 'flex', justifyContent: 'center'}}>
            <table className="table" style={{width: 'auto', margin: '0 auto'}}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>What it shrinks</th>
                  <th style={{textAlign: 'center'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/caveman" target="_blank" rel="noopener noreferrer"><strong>caveman</strong></a></td>
                  <td>what the agent <strong>says</strong>, and now what it <strong>reads</strong></td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--success">live</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/caveman-browse" target="_blank" rel="noopener noreferrer"><strong>caveman-browse</strong></a></td>
                  <td>what the agent <strong>sees in the browser</strong></td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--success">live</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/caveman/tree/main/packages/agent" target="_blank" rel="noopener noreferrer"><strong>caveman-agent-sdk</strong></a></td>
                  <td>what your production agent loads, calls, and spends</td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--info">in dev</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/cavegemma" target="_blank" rel="noopener noreferrer"><strong>cavegemma</strong></a></td>
                  <td>compression <strong>baked into weights</strong> (Gemma fine-tune)</td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--warning">labs</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/caveman-code" target="_blank" rel="noopener noreferrer"><strong>caveman-code</strong></a></td>
                  <td>the whole agent, end to end</td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--secondary">frozen</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/cavemem" target="_blank" rel="noopener noreferrer"><strong>cavemem</strong></a></td>
                  <td>what the agent <strong>remembers</strong>, across sessions</td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--secondary">frozen</span></td>
                </tr>
                <tr>
                  <td><a href="https://github.com/JuliusBrussee/cavekit" target="_blank" rel="noopener noreferrer"><strong>cavekit</strong></a></td>
                  <td>the <strong>build loop</strong>, spec-driven</td>
                  <td style={{textAlign: 'center'}}><span className="badge badge--secondary">frozen</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
}
