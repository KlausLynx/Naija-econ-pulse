import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import './index.css';

const gdpData = [
  { year: 1960, t: "Independence from Britain" },
  { year: 1961, t: null },
  { year: 1962, nt: null },
  { year: 1963, nt: "First Republic declared" },
  { year: 1964, nt: null },
  { year: 1965, nt: null },
  { year: 1966, nt: "Military coup" },
  { year: 1967, nt: "Biafra War begins" },
  { year: 1968, t: "Civil War continues" },
  { year: 1969, nt: null },
  { year: 1970, nt: "Civil War ends. Oil boom begins" },
  { year: 1971, ent: "Joins OPEC" },
  { year: 1972, ent: null },
  { year: 1973, ent: "Global oil price spike" },
  { year: 1974, ent: "Peak oil revenue era" },
  { year: 1975, ent: "Gowon ousted" },
  { year: 1976, ent: null },
  { year: 1977, ent: "Oil wealth peak" },
  { year: 1978, ent: null },
  { year: 1979, ent: "Return to democracy" },
  { year: 1980, ent: "Pre-oil crash peak" },
  { year: 1981, vent: "Oil price crash begins" },
  { year: 1982, vent: null },
  { year: 1983, vent: "Buhari coup" },
  { year: 1984, ent: "Austerity measures" },
  { year: 1985, ent: "Babangida takes power" },
  { year: 1986, ent: "SAP introduced — World Bank" },
  { year: 1987, ent: null },
  { year: 1988, ent: null },
  { year: 1989, ent: null },
  { year: 1990, ent: "Oil recovery" },
  { year: 1991, ent: null },
  { year: 1992, ent: null },
  { year: 1993, ent: "Annulled elections / crisis" },
  { year: 1994, ent: "Abacha seizes power" },
  { year: 1995, vent: "Ken Saro-Wiwa executed" },
  { year: 1996, vent: null },
  { year: 1997, vent: null },
  { year: 1998, vent: "Abacha dies" },
  { year: 1999, ent: "Democracy restored — Obasanjo" },
  { year: 2000, ent: "Oil boom 2.0 begins" },
  { year: 2001, ent: null },
  { year: 2002, ent: null },
  { year: 2003, ent: null },
  { year: 2004, ent: null },
  { year: 2005, event: "Paris Club debt relief" },
  { year: 2006, event: null },
  { year: 2007, event: "Yar'Adua elected" },
  { year: 2008, event: "Global financial crisis" },
  { year: 2009, event: null },
  { year: 2010, event: "Jonathan presidency begins" },
  { year: 2011, event: null },
  { year: 2012, event: null },
  { year: 2013, event: null },
  { year: 2014, event: "GDP rebased — overtakes S.Africa" },
  { year: 2015, event: "Buhari wins. Oil crash" },
  { year: 2016, event: "Recession #1" },
  { year: 2017, event: null },
  { year: 2018, event: null },
  { year: 2019, event: null },
  { year: 2020, event: "COVID-19 — Recession #2" },
  { year: 2021, event: null },
  { year: 2022, event: "All-time nominal peak" },
  { year: 2023, event: "Tinubu elected. Naira floated" },
  { year: 2024, event: "Naira collapse wipes GDP in half" },
  { year: 2025, event: "GDP rebased to 2019 base year (NBS)" },
];

const eras = [
  {
    "range": "1960–1966",
    "label": "Post-Independence",
    "color": "#22c55e",
    "gdpUSD": "$4.2B → $6.4B",
    "gdpNaira": "₦3.0B → ₦4.6B",
    "worthTodayNaira": "₦61.2T → ₦85.1T",
    "desc": "Agriculture-led economy. Groundnuts, palm oil, cocoa. Nearly food self-sufficient before oil consumed everything."
  },
  {
    "range": "1967–1970",
    "label": "Civil War / Biafra",
    "color": "#ef4444",
    "gdpUSD": "$5.2B → $12.5B",
    "gdpNaira": "₦4.3B → ₦10.3B",
    "worthTodayNaira": "₦55.9T → ₦138.3T",
    "desc": "1–3 million died, mostly from starvation. Southeast deliberately blockaded. Economy devastated in Igbo regions."
  },
  {
    "range": "1971–1981",
    "label": "Oil Boom",
    "color": "#f59e0b",
    "gdpUSD": "$9.2B → $164.5B",
    "gdpNaira": "₦6.7B → ₦100.3B",
    "worthTodayNaira": "₦99.8T → ₦743.5T",
    "desc": "Petrodollar explosion. Agriculture abandoned. Imports exploded. A generation of leaders built nothing lasting with the wealth."
  },
  {
    "range": "1982–1998",
    "label": "The Lost Decades",
    "color": "#ef4444",
    "gdpUSD": "$142.8B → $218.4B (official) / $59.1B (real, post-1999 float)",
    "gdpNaira": "₦96.1B → ₦4.78T (official)",
    "worthTodayNaira": "₦649.0T → ₦567.9T (official) / ₦149.0T (real)",
    "desc": "Oil prices crashed. World Bank forced SAP. Naira devalued. Abacha stole billions. GDP per capita collapsed 66%."
  },
  {
    "range": "1999–2014",
    "label": "Democratic Growth",
    "color": "#22c55e",
    "gdpUSD": "$59.1B → $574.2B",
    "gdpNaira": "₦5.4T → ₦90.7T",
    "worthTodayNaira": "₦149.0T → ₦1,030.8T",
    "desc": "Democracy returned. Telecoms, Nollywood, banking boomed. 2014 rebasing revealed the economy was always bigger."
  },
  {
    "range": "2015–2024",
    "label": "Volatility & Crash",
    "color": "#ef4444",
    "gdpUSD": "$493.0B → $187.8B (World Bank) / $254.5B (NBS rebased)",
    "gdpNaira": "₦98.1T → ₦372.8T (rebased)",
    "worthTodayNaira": "₦872.5T → ₦272.7T (WB) / ₦352.5T (rebased)",
    "desc": "Two recessions. COVID. Then Tinubu's 2023 naira float cut dollar GDP in half overnight. Back to 2006 levels."
  },
  {
    "range": "2025–Present",
    "label": "Rebasing & Recovery",
    "color": "#22c55e",
    "gdpUSD": "$285B → ~$334B (2026 IMF projection)",
    "gdpNaira": "~₦427T → ~₦444T",
    "worthTodayNaira": "~₦389.7T → ~₦444.2T",
    "desc": "GDP rebasing revealed a much bigger informal economy. Naira strengthened from ~₦1,600/$ (mid-2024 low) to ~₦1,330/$ by Sept 2026. IMF credits reforms — subsidy removal, FX unification — with the rebound; projects Nigeria overtaking Algeria as Africa's 3rd-largest economy in 2026."
  }
]

const keyEvents = [
  { year: 1960, color: "#22c55e", label: "Independence" },
  { year: 1967, color: "#ef4444", label: "Biafra War" },
  { year: 1971, color: "#f59e0b", label: "Oil Boom" },
  { year: 1983, color: "#ef4444", label: "Coup" },
  { year: 1986, color: "#ef4444", label: "SAP/World Bank" },
  { year: 1999, color: "#22c55e", label: "Democracy" },
  { year: 2014, color: "#3b82f6", label: "GDP Rebased" },
  { year: 2016, color: "#ef4444", label: "Recession" },
  { year: 2020, color: "#ef4444", label: "COVID Recession" },
  { year: 2023, color: "#ef4444", label: "Subsidy Removal & Naira Float" },
  { year: 2024, color: "#ef4444", label: "Inflation Peak" },
  { year: 2025, color: "#3b82f6", label: "GDP Rebased (2019 base)" },
];

const leaderChanges = [
  { year: 1960, color: "#a78bfa", label: "Balewa (PM)" },
  { year: 1966, color: "#a78bfa", label: "Aguiyi-Ironsi" },
  { year: 1966, color: "#a78bfa", label: "Gowon" },
  { year: 1975, color: "#a78bfa", label: "Murtala Mohammed" },
  { year: 1976, color: "#a78bfa", label: "Obasanjo (military)" },
  { year: 1979, color: "#a78bfa", label: "Shagari" },
  { year: 1983, color: "#a78bfa", label: "Buhari (military)" },
  { year: 1985, color: "#a78bfa", label: "Babangida" },
  { year: 1993, color: "#a78bfa", label: "Shonekan" },
  { year: 1993, color: "#a78bfa", label: "Abacha" },
  { year: 1998, color: "#a78bfa", label: "Abubakar" },
  { year: 1999, color: "#a78bfa", label: "Obasanjo (civilian)" },
  { year: 2007, color: "#a78bfa", label: "Yar'Adua" },
  { year: 2010, color: "#a78bfa", label: "Jonathan" },
  { year: 2015, color: "#a78bfa", label: "Buhari (civilian)" },
  { year: 2023, color: "#a78bfa", label: "Tinubu" },
];

const markers = [...keyEvents, ...leaderChanges].sort((a, b) => a.year - b.year);

const getWbData = async (indicator) => {
  const url = `https://api.worldbank.org/v2/country/NGA/indicator/${indicator}?format=json&per_page=100&date=1960:2025`;
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Request failed:' + response.status)
  }
  const data = await response.json()
  let mainData = {}
  data[1].forEach( sepData => {
    if(sepData.value !== null) {
        mainData[Number(sepData.date)] = sepData.value
    }
    return mainData
  })
  return mainData
}


const views = {
  realGdp: {
    tag: "Inflation-adjusted ₦ · 2015 prices",
    note: "Prices are held fixed at 2015 levels, so inflation and the falling naira are removed. A rise here means Nigeria actually produced more.",
  },
  rates: {
    tag: "Exchange rate · ₦ per $1",
    note: "How many naira you needed to buy $1 that year. A rising line means the naira is getting weaker.",
  },
  dollarsPer1000: {
    tag: "What ₦1,000 buys in $",
    note: "The same exchange rate, flipped. Instead of asking how many naira buy $1, this asks how many dollars ₦1,000 buys. A falling line means the naira is losing value.",
  },
};



export default function NigeriaGDP() {
  const [metric, setMetric] = useState("realGdp");
  const [realGdp, setRealGdp] = useState({});
  const [rates, setRates] = useState({});
  const [nairaGdp, setNairaGdp] = useState({});
  const [nairaPerCapita, setNairaPerCapita] = useState({});
  const [realPerCapita, setRealPerCapita] = useState({});
  const [realGdpError, setRealGdpError] = useState(null)
  const [activeEra, setActiveEra] = useState(null);

  const merged = gdpData.map(d => ({
    ...d, 
    realGdp: realGdp[d.year] ? realGdp[d.year] / 1e12 : null, 
    nairaGdp: nairaGdp[d.year] ?? null,
    rates: rates[d.year] ?? null, 
    dollarsPer1000: rates[d.year] ? 1000 / rates[d.year] : null,
    realPerCapita: realPerCapita[d.year] ?? null,
    nairaPerCapita: nairaPerCapita[d.year] ?? null
  }))
  const data = merged.map(d => ({ ...d, value: d[metric] }));
  console.log(data)

  useEffect(()=> {
    getWbData("NY.GDP.MKTP.KN").then(setRealGdp)
    getWbData("PA.NUS.FCRF").then(setRates)
    getWbData("NY.GDP.PCAP.CN").then(setNairaPerCapita);
    getWbData("NY.GDP.PCAP.KN").then(setRealPerCapita);
    getWbData("NY.GDP.MKTP.CN").then(setNairaGdp);
    
  },[])

  useEffect(()=> {
    console.log(merged)
  }, [merged])

  const compact = new Intl.NumberFormat("en", {notation: "compact", maximumFractionDigits: 1})

  // const CustomTooltip = ({ active, payload, label }) => {
  //   console.log({active, payload, label})  

  //   if (!active || !payload || !payload.length) return null;
  //   const d = merged.find(x => x.year === label);
  //   console.log(d)
  //   return (
  //     <div style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "14px 18px", fontFamily: "monospace", fontSize: 12, color: "#e5e5e5", maxWidth: 220, boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
  //       <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>{label}</div>
  //       <div style={{color: `${metric === 'realGdp' ? 'green' : '#888'}`, marginBottom: 2 }}>Real Gdp:<span style={{ color: "#fff" }}>{compact.format(d?.realGdp)}</span></div>
  //       <div style={{color: `${metric === 'nairaGdp' ? 'green' : '#888'}`}}>Nominal Gdp: <span style={{ color: "#fff" }}>{compact.format(d?.nairaGdp)}</span></div>
  //       <div style={{color: `${metric === 'realPerCapita' ? 'green' : '#888'}`}}>Real Per capita: <span style={{ color: "#fff" }}>{compact.format(d?.realPerCapita)}</span></div>
  //       <div style={{color: `${metric === 'nairaPerCapita' ? 'green' : '#888'}`}}>Nominal Per capita: <span style={{ color: "#fff" }}>{compact.format(d?.nairaPerCapita)}</span></div>
  //       <div style={{color: `${metric === 'rates' ? 'green' : '#888'}`}}>Naira Rates: <span style={{ color: "#fff" }}>₦{Math.round(d.rates).toLocaleString()}</span></div>
  //       <div style={{color: `${metric === 'dollarsPer1000' ? 'green' : '#888'}`}}>Dollar Rates: <span style={{ color: "#fff" }}>${d?.dollarsPer1000.toFixed(2)}</span></div>
  //       {d?.event && <div style={{ color: "#f59e0b", marginTop: 10, fontSize: 11, borderTop: "1px solid #222", paddingTop: 8 }}>⚡ {d.event}</div>}
  //     </div>
  //   );
  // };

  const firstYear = merged[0].year
  const latestIndex = merged.length - 1
  const latestYear = merged[latestIndex].year

  const peakOf = key =>
    merged.reduce((best, d) => (d[key] ?? 0) > (best[key] ?? 0) ? d : best, merged[0]);
  const yr = (row, key) => (Number.isFinite(row[key]) ? row.year : null);
  const peakNomGdp = peakOf("nairaGdp");
  const peakRealGdp = peakOf("realGdp");
  const peakNomPerCapital = peakOf("nairaPerCapita");
  const peakRealPerCapital = peakOf("realPerCapita");
  const peakRates = peakOf("rates");

  useEffect(() => { 
    console.log(peakNomPerCapital)
  }, [peakNomPerCapital])

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "monospace", color: "#e5e5e5", padding: "32px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');
        .tog { background: transparent; border: 1px solid #2a2a2a; color: #666; padding: 8px 18px; font-family: monospace; font-size: 11px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; border-radius: 3px; }
        .tog.on { background: #f59e0b; border-color: #f59e0b; color: #000; font-weight: bold; }
        .tog:hover:not(.on) { border-color: #f59e0b; color: #f59e0b; }
        .era { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 6px; padding: 16px; cursor: pointer; transition: all 0.2s; }
        .era:hover { border-color: #333; transform: translateY(-1px); }
        .scard { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 6px; padding: 16px 20px; flex: 1; min-width: 130px; }
      `}</style>

      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "#f59e0b", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>World Bank · {`${firstYear} - ${latestYear}` } · {metric === "realGdp" ? "Inflation-adjusted ₦ · 2015 prices" : "Nominal USD"}</div>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(40px,7vw,80px)", color: "#fff", lineHeight: 1, letterSpacing: 2 }}>NIGERIA ECONOMIC STATS</div>
        <div style={{ color: "#444", fontSize: 11, marginTop: 8, maxWidth: 520, lineHeight: 1.7 }}>
          64 years of booms, crashes, coups, and corruption — every political rupture visible in the numbers. Hover any point for details.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: `${firstYear} GDP`, val: { nom: compact.format(nairaGdp[firstYear]), real: compact.format(realGdp[firstYear]) }, sub: "Year of independence, Real is in 2015 naira, so it looks bigger than nominal" },
          {
            label: "All-Time Peak",
            val: {
              nomGdp: compact.format(peakNomGdp.nairaGdp),
              realGdp: compact.format(realGdp[peakRealGdp.year]),
              nomPc: compact.format(peakNomPerCapital.nairaPerCapita),
              realPc: compact.format(peakRealPerCapital.realPerCapita),
              rate: Math.round(peakRates.rates).toLocaleString(),
            },
            years: {
              nomGdp: yr(peakNomGdp, "nairaGdp"),
              realGdp: yr(peakRealGdp, "realGdp"),
              nomPc: yr(peakNomPerCapital, "nairaPerCapita"),
              realPc: yr(peakRealPerCapital, "realPerCapita"),
              rate: yr(peakRates, "rates"),
            },
            sub: "Highest yearly value of each",
          },
          { label: `${latestYear} GDP`, val: { nom: compact.format(nairaGdp[latestYear]), real: compact.format(realGdp[latestYear]) }, sub: "After naira collapse" },
          { label: "Per Capita Peak", val: { nomPc: compact.format(peakNomPerCapital.nairaPerCapita), realPc: compact.format(peakRealPerCapital.realPerCapita) },
            sub: { nom: `Nominal peak: ${peakNomPerCapital.year}`, real: `Real peak: ${peakRealPerCapital.year}` } },
          { label: "Recessions", val: "5+", sub: "82, 84, 94, 2016, 2020" },
        ].map(s => {
          const rows = typeof s.val === "string" ? null : Object.entries(s.val);
          const subs = typeof s.sub === "string" ? [s.sub] : Object.values(s.sub);
          const valLabels = {
            nom: "Nominal",
            real: "Real",
            nomGdp: "Nominal GDP",
            realGdp: "Real GDP",
            nomPc: "Nominal per capita",
            realPc: "Real per capita",
            rate: "Exchange rate",
          };
          return (
            <div key={s.label} className="scard">
              <div style={{ color: "#555", fontSize: 9, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>

              {rows ? rows.map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
                  <span style={{ color: "#666", fontSize: 10 }}>{valLabels[k]}</span>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ color: "#f59e0b", fontFamily: "'Bebas Neue', cursive", fontSize: 20, letterSpacing: 0.5 }}>₦{v}</span>
                    {s.years?.[k] && <span style={{ color: "#555", fontSize: 9 }}>{s.years[k]}</span>}
                  </span>
                </div>
              )) : (
                <div style={{ color: "#f59e0b", fontFamily: "'Bebas Neue', cursive", fontSize: 26 }}>{s.val}</div>
              )}

              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px solid #1c1c1c" }}>
                {subs.map(t => <div key={t} style={{ color: "#444", fontSize: 9, marginTop: 2 }}>{t}</div>)}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button className={`tog ${metric === "realGdp" ? "on" : ""}`} onClick={() => setMetric("realGdp")}>Real GDP (#)</button>
        <button className={`tog ${metric === "nairaGdp" ? "on" : ""}`} onClick={() => setMetric("nairaGdp")}>Nominal GDP (#)</button>
        <button className={`tog ${metric === "realPerCapita" ? "on" : ""}`} onClick={() => setMetric("realPerCapita")}>Real Per Capita (#)</button>
        <button className={`tog ${metric === "nairaPerCapita" ? "on" : ""}`} onClick={() => setMetric("nairaPerCapita")}>Per Capita (#)</button>
        <button className={`tog ${metric === "dollarsPer1000 || rates" ? "on" : ""}`} onClick={() => setMetric((prev) => prev === "dollarsPer1000" ? "rates" : "dollarsPer1000")}>{metric === "dollarsPer1000" ? "Dollar Per 1000" : "Rates(#)"}</button>
      </div>

        {
          views[metric] && (
            <div style={{ color: "#888", fontSize: 11, marginBottom: 16, maxWidth: 520, lineHeight: 1.7 }}>
              {views[metric].note}
            </div>
          )
        }

      <div style={{ background: "#0c0c0c", border: "1px solid #181818", borderRadius: 8, padding: "20px 4px 12px", marginBottom: 32 }}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={data} margin={{ top: 10, right: 24, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#151515" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "#444", fontSize: 10, fontFamily: "monospace" }} tickLine={false} axisLine={{ stroke: "#1a1a1a" }} interval={4} />
            <YAxis 
              tick={{ fill: "#444", fontSize: 10, fontFamily: "monospace" }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={v =>
                metric === "realGdp" ? `₦${v.toFixed(0)}T`
                : metric === "nairaGdp" || metric === "nairaPerCapita" || metric === "realPerCapita" ? `₦${compact.format(v)}`
                : metric === "rate" ? `₦${v >= 10 ? Math.round(v).toLocaleString() : v.toFixed(2)}`
                : metric === "dollarsPer1000" ? `$${v >= 10 ? Math.round(v).toLocaleString() : v.toFixed(2)}`
                : `$${v.toLocaleString()}`
              }
              width={58} />
            {/* <Tooltip content={<CustomTooltip />} /> */}
            {markers.map(e => (
              <ReferenceLine key={e.year} x={e.year} stroke={e.color} strokeOpacity={0.35} strokeDasharray="4 3" strokeWidth={1} />
            ))}
            <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} fill="url(#g1)" dot={false} activeDot={{ r: 5, fill: "#f59e0b", stroke: "#000", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "12px 20px 0", borderTop: "1px solid #161616", marginTop: 8 }}>
          {markers.map(e => (
            <div key={e.year} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: e.color }} />
              <span style={{ color: "#444", fontSize: 10 }}>{e.year} — {e.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: "#fff", letterSpacing: 2, marginBottom: 16 }}>THE 6 ECONOMIC ERAS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, alignItems: "start" }}>
          {eras.map((e, i) => {
            const open = activeEra === i;
            const toggle = () => setActiveEra(open ? null : i);
            const soft = (pct) => `color-mix(in srgb, ${e.color} ${pct}%, transparent)`;

            const label = { fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase", color: "#666" };
            const value = { fontSize: 12, fontWeight: 600, color: "#f59e0b", textAlign: "right", fontVariantNumeric: "tabular-nums" };
            const row = { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 };

            return (
              <div
                key={i}
                className="era"
                role="button"
                tabIndex={0}
                aria-expanded={open}
                onClick={toggle}
                onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && toggle()}
                onMouseEnter={(ev) => {
                  ev.currentTarget.style.transform = "translateY(-2px)";
                  ev.currentTarget.style.boxShadow = `0 8px 24px -12px ${soft(55)}`;
                }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.transform = "none";
                  ev.currentTarget.style.boxShadow = "none";
                }}
                style={{
                  padding: "16px 18px",
                  background: "linear-gradient(160deg, #141414 0%, #0d0d0d 100%)",
                  border: "1px solid #1f1f1f",
                  borderLeft: `3px solid ${e.color}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform .2s ease, box-shadow .2s ease",
                }}
              >
                {/* Top row: era range pill + chevron */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase",
                    color: e.color, background: soft(14), padding: "3px 8px", borderRadius: 999,
                  }}>
                    {e.range}
                  </span>
                  <span style={{
                    fontSize: 12, color: open ? e.color : "#555",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform .25s ease, color .2s ease",
                  }}>
                    ▾
                  </span>
                </div>

                {/* Title */}
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 14 }}>
                  {e.label}
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gap: 6, paddingTop: 12, borderTop: "1px solid #1f1f1f" }}>
                  <div style={row}>
                    <span style={label}>GDP (USD)</span>
                    <span style={value}>{e.gdpUSD}</span>
                  </div>
                  <div style={row}>
                    <span style={label}>GDP (Naira)</span>
                    <span style={value}>{e.gdpNaira}</span>
                  </div>
                  <div style={{
                    ...row, marginTop: 4, padding: "7px 10px",
                    background: "#101010", border: "1px dashed #2a2a2a", borderRadius: 6,
                  }}>
                    <span style={label}>Worth at today's rate</span>
                    <span style={{ ...value, color: "#fff" }}>{e.worthTodayNaira}</span>
                  </div>
                </div>

                {/* Expandable description (smooth slide) */}
                <div style={{
                  display: "grid",
                  gridTemplateRows: open ? "1fr" : "0fr",
                  transition: "grid-template-rows .3s ease",
                }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{
                      marginTop: 12, paddingTop: 12, borderTop: "1px solid #1f1f1f",
                      color: "#9a9a9a", fontSize: 12, lineHeight: 1.75,
                    }}>
                      {e.desc}
                    </div>
                  </div>
                </div>

                {/* Hint */}
                <div style={{ marginTop: 12, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: "#444" }}>
                  {open ? "Click to collapse ↑" : "Click to expand ↓"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}