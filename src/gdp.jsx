import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import './index.css';

const gdpData = [
  { year: 1960, event: "Independence from Britain" },
  { year: 1961, event: null },
  { year: 1962, event: null },
  { year: 1963, event: "First Republic declared" },
  { year: 1964, event: null },
  { year: 1965, event: null },
  { year: 1966, event: "Military coup" },
  { year: 1967, event: "Biafra War begins" },
  { year: 1968, event: "Civil War continues" },
  { year: 1969, event: null },
  { year: 1970, event: "Civil War ends. Oil boom begins" },
  { year: 1971, event: "Joins OPEC" },
  { year: 1972, event: null },
  { year: 1973, event: "Global oil price spike" },
  { year: 1974, event: "Peak oil revenue era" },
  { year: 1975, event: "Gowon ousted" },
  { year: 1976, event: null },
  { year: 1977, event: "Oil wealth peak" },
  { year: 1978, event: null },
  { year: 1979, event: "Return to democracy" },
  { year: 1980, event: "Pre-oil crash peak" },
  { year: 1981, event: "Oil price crash begins" },
  { year: 1982, event: null },
  { year: 1983, event: "Buhari coup" },
  { year: 1984, event: "Austerity measures" },
  { year: 1985, event: "Babangida takes power" },
  { year: 1986, event: "SAP introduced — World Bank" },
  { year: 1987, event: null },
  { year: 1988, event: null },
  { year: 1989, event: null },
  { year: 1990, event: "Oil recovery" },
  { year: 1991, event: null },
  { year: 1992, event: null },
  { year: 1993, event: "Annulled elections / crisis" },
  { year: 1994, eevnt: "Abacha seizes power" },
  { year: 1995, event: "Ken Saro-Wiwa executed" },
  { year: 1996, event: null },
  { year: 1997, event: null },
  { year: 1998, event: "Abacha dies" },
  { year: 1999, event: "Democracy restored — Obasanjo" },
  { year: 2000, event: "Oil boom 2.0 begins" },
  { year: 2001, event: null },
  { year: 2002, event: null },
  { year: 2003, event: null },
  { year: 2004, event: null },
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
    "desc": "Agriculture-led economy. Groundnuts, palm oil, cocoa. Nearly food self-sufficient before oil consumed everything."
  },
  {
    "range": "1967–1970",
    "label": "Civil War / Biafra",
    "color": "#ef4444",
    "desc": "1–3 million died, mostly from starvation. Southeast deliberately blockaded. Economy devastated in Igbo regions."
  },
  {
    "range": "1971–1981",
    "label": "Oil Boom",
    "color": "#f59e0b",
    "desc": "Petrodollar explosion. Agriculture abandoned. Imports exploded. A generation of leaders built nothing lasting with the wealth."
  },
  {
    "range": "1982–1998",
    "label": "The Lost Decades",
    "color": "#ef4444",
    "desc": "Oil prices crashed. World Bank forced SAP. Naira devalued. Abacha stole billions. GDP per capita collapsed 66%."
  },
  {
    "range": "1999–2014",
    "label": "Democratic Growth",
    "color": "#22c55e",
    "desc": "Democracy returned. Telecoms, Nollywood, banking boomed. 2014 rebasing revealed the economy was always bigger."
  },
  {
    "range": "2015–2024",
    "label": "Volatility & Crash",
    "color": "#ef4444",
    "desc": "Two recessions. COVID. Then Tinubu's 2023 naira float cut dollar GDP in half overnight. Back to 2006 levels."
  },
  {
    "range": "2025–Present",
    "label": "Rebasing & Recovery",
    "color": "#22c55e",   
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
  { year: 1960, color: "#fff", label: "Balewa (PM)" },
  { year: 1966, color: "#fff", label: "Aguiyi-Ironsi" },
  { year: 1966, color: "#fff", label: "Gowon" },
  { year: 1975, color: "#fff", label: "Murtala Mohammed" },
  { year: 1976, color: "#fff", label: "Obasanjo (military)" },
  { year: 1979, color: "#fff", label: "Shagari" },
  { year: 1983, color: "#fff", label: "Buhari (military)" },
  { year: 1985, color: "#fff", label: "Babangida" },
  { year: 1993, color: "#fff", label: "Shonekan" },
  { year: 1993, color: "#fff", label: "Abacha" },
  { year: 1998, color: "#fff", label: "Abubakar" },
  { year: 1999, color: "#fff", label: "Obasanjo (civilian)" },
  { year: 2007, color: "#fff", label: "Yar'Adua" },
  { year: 2010, color: "#fff", label: "Jonathan" },
  { year: 2015, color: "#fff", label: "Buhari (civilian)" },
  { year: 2023, color: "#fff", label: "Tinubu" },
];

const views = {
  realGdp: {
    tag: "Inflation-adjusted ₦ · 2015 prices",
    note: "Prices are held fixed at 2015 levels, so inflation and the falling naira are removed. A rise here means Nigeria actually produced more.",
  },
  nairaGdp: {
    tag: "Nominal GDP · ₦ at each year's prices",
    note: "Total output in naira, valued at that year's prices. Inflation is not removed, so the line can climb even when Nigeria produced no more. Compare it with Real GDP to see how much of the rise is just higher prices.",
  },
  realPerCapita: {
    tag: "Real GDP per person · ₦ · 2015 prices",
    note: "Real GDP divided by the number of people, with prices held at 2015 levels. It shows how much the average Nigerian actually produced. A rising line means the average person is better off.",
  },
  nairaPerCapita: {
    tag: "Nominal GDP per person · ₦ at each year's prices",
    note: "GDP divided by the number of people, at that year's prices with no inflation adjustment. It rises with prices, so a big jump here does not mean people got richer. Compare it with Real Per Capita.",
  },
  rates: {
    tag: "Exchange rate · ₦ per $1",
    note: "How many naira you needed to buy $1 that year. A rising line means the naira is getting weaker.",
  },
  dollarsPer1000: {
    tag: "What ₦1,000 buys in $",
    note: "The same exchange rate, flipped. Instead of asking how many naira buy $1, this asks how many dollars ₦1,000 buys. A falling line means the naira is losing value.",
  },
  cpi: {
    tag: "Consumer price index · 2010 = 100",
    note: "A basket of everyday goods is priced at 100 in 2010. If the line reads 200, the same basket now costs twice as much. A rising line means prices are going up.",
  },
};

// Tracks the screen width so the chart can resize its height, ticks and spacing
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export default function NigeriaGDP() {
  const [metric, setMetric] = useState("realGdp");
  const [realGdp, setRealGdp] = useState({});
  const [rates, setRates] = useState({});
  const [nairaGdp, setNairaGdp] = useState({});
  const [nairaPerCapita, setNairaPerCapita] = useState({});
  const [cpi, setCpi] = useState({});
  const [realPerCapita, setRealPerCapita] = useState({});
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeEra, setActiveEra] = useState(null);
  const [textAmount, setTextAmount] = useState(null);
  const [textFrom, setTextFrom] = useState(null);
  const [percentGrowth, setPercentGrowth] = useState(null)
  const [buyingPower, setBuyingPower] = useState(null)

  const width = useWindowWidth();
  const isPhone = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const chartHeight = isPhone ? 260 : isTablet ? 340 : 440;
  const tickSize = isPhone ? 11 : 13;
  const yAxisWidth = isPhone ? 54 : 72;
  const xInterval = isPhone ? 9 : isTablet ? 6 : 4;

  const merged = gdpData.map(d => ({
    ...d,
    realGdp: realGdp[d.year] ? realGdp[d.year] / 1e12 : null,
    nairaGdp: nairaGdp[d.year] ?? null,
    rates: rates[d.year] ?? null,
    cpi: cpi[d.year] ?? null,
    dollarsPer1000: rates[d.year] ? 1000 / rates[d.year] : null,
    realPerCapita: realPerCapita[d.year] ?? null,
    nairaPerCapita: nairaPerCapita[d.year] ?? null
  }))

  const data = merged.map(d => ({ ...d, value: d[metric] }));

  const markers = [...keyEvents, ...leaderChanges].sort((a, b) => a.year - b.year);

  const getWbData = async (indicator) => {
    const key = indicator;
    const saved = localStorage.getItem(key);
    
    const ExpiryDate = 7 * 24 * 60 * 60 * 1000

    if(saved) {
      const cached = JSON.parse(saved)
      if (Date.now() - cached.savedAt < ExpiryDate) {
        return cached.data
      }
    }

    const url = `https://api.worldbank.org/v2/country/NGA/indicator/${indicator}?format=json&per_page=100&date=1960:2025`;
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Request failed:' + response.status)
    }
    const data = await response.json()
    let mainData = {}
    data[1].forEach(sepData => {
      if (sepData.value !== null) {
        mainData[Number(sepData.date)] = sepData.value
      }
    })
    localStorage.setItem(key, JSON.stringify({savedAt: Date.now(), data: mainData}))
    return mainData
  }

  const WBDApi = [
    ["NY.GDP.MKTP.KN", setRealGdp],
    ["PA.NUS.FCRF", setRates],
    ["NY.GDP.PCAP.CN", setNairaPerCapita],
    ["NY.GDP.PCAP.KN", setRealPerCapita],
    ["NY.GDP.MKTP.CN", setNairaGdp],
    ["FP.CPI.TOTL", setCpi]
  ]

  useEffect(() => {
    WBDApi.forEach(([code, setter]) => {
      getWbData(code).then(setter)
    })
  }, [])

  const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 })

  const CPI_BASE_YEAR = 2010
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

  const handleYear = (e) => {
    const { id, value } = e.target

    if (value.length > 4) {
      setErrorMessage("Digits in the year shouldn't be more than four")

      if (id === "fromYear") {
        setFromYear("")
      } else {
        setToYear("")
      }
      return
    }

    if (Number(value) > latestYear) {
      setErrorMessage("Digits in the year shouldn't be more than the current year")
      if (id === "fromYear") {
        setFromYear("")
      } else {
        setToYear("")
      }
      return
    }

    setErrorMessage(null)

    if (id === "fromYear") {
      setFromYear(value)
    } else {
      setToYear(value)
    }
  }

  const percentG = (old, recent) => {
    let Rd = (recent - old) / old * 100
    return Rd.toFixed(2)
  }

  const buyingPercent = (old, recent) => {
    let Rd = (old / recent - 1) * 100
    return Rd.toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let final = amount * cpi[toYear] / cpi[fromYear]
    let finalResult = final.toLocaleString('en-NG', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })
    setResult(finalResult)

    setTextAmount(amount)
    setTextFrom(fromYear)
    setPercentGrowth(() => percentG(amount, final))
    setBuyingPower(() => buyingPercent(amount, final))

    setToYear('')
    setFromYear('')
    setAmount('')
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;

    const row = (key, name, text) => (
      <div className={`tt-row ${metric === key ? "on" : ""}`}>
        {name}: <span>{text}</span>
      </div>
    );

    const note = d.event ?? d.ent ?? d.vent ?? d.nt ?? d.t;

    return (
      <div className="tt-box">
        <div className="tt-year">{label}</div>
        {row("realGdp", "Real GDP", d.realGdp == null ? "—" : `₦${d.realGdp.toFixed(1)}T`)}
        {row("nairaGdp", "Nominal GDP", d.nairaGdp == null ? "—" : `₦${compact.format(d.nairaGdp)}`)}
        {row("realPerCapita", "Real per capita", d.realPerCapita == null ? "—" : `₦${compact.format(d.realPerCapita)}`)}
        {row("nairaPerCapita", "Nominal per capita", d.nairaPerCapita == null ? "—" : `₦${compact.format(d.nairaPerCapita)}`)}
        {row("rates", "Naira rate", d.rates == null ? "—" : `₦${Math.round(d.rates).toLocaleString()} / $1`)}
        {row("dollarsPer1000", "₦1,000 buys", d.dollarsPer1000 == null ? "—" : `$${d.dollarsPer1000.toFixed(2)}`)}
        {row("cpi", "CPI", d.cpi == null ? "—" : d.cpi.toFixed(1))}
        {note && <div className="tt-note">⚡ {note}</div>}
      </div>
    );
  };

  const valLabels = {
    nom: "Nominal",
    real: "Real",
    nomGdp: "Nominal GDP",
    realGdp: "Real GDP",
    nomPc: "Nominal per capita",
    realPc: "Real per capita",
    rate: "Exchange rate",
    then: "Worth then",
    now: "Worth today",
  };

  const stats = [
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
    {
      label: "Per Capita Peak", val: { nomPc: compact.format(peakNomPerCapital.nairaPerCapita), realPc: compact.format(peakRealPerCapital.realPerCapita) },
      sub: { nom: `Nominal peak: ${peakNomPerCapital.year}`, real: `Real peak: ${peakRealPerCapital.year}` }
    },
    { label: "Recessions", val: "5+", sub: "82, 84, 94, 2016, 2020" },
    { label: "Worth Today", val: { then: "1,000", now: compact.format(1000 * cpi[latestYear] / cpi[CPI_BASE_YEAR]) }, years: { then: 2010, now: latestYear }, sub: `₦1,000 in 2010 needs this much in ${latestYear} to buy the same things` },
  ];

  const ratesOn = metric === "rates" || metric === "dollarsPer1000";

  return (
    <div className="ng-root">
      <div className="ng-wrap">
        <div className="ng-head">
          <div className="ng-eyebrow">World Bank · {`${firstYear} - ${latestYear}`} · {views[metric].tag}</div>
          <div className="ng-title">NIGERIA ECONOMIC STATS</div>
          <div className="ng-intro">
            64 years of booms, crashes, coups, and corruption — every political rupture visible in the numbers. Hover any point for details.
          </div>
        </div>

        <div className="ng-stats">
          {stats.map(s => {
            const rows = typeof s.val === "string" ? null : Object.entries(s.val);
            const subs = typeof s.sub === "string" ? [s.sub] : Object.values(s.sub);
            return (
              <div key={s.label} className="scard">
                <div className="scard-label">{s.label}</div>

                {rows ? rows.map(([k, v]) => (
                  <div key={k} className="scard-row">
                    <span className="scard-key">{valLabels[k]}</span>
                    <span className="scard-valwrap">
                      <span className="scard-val">₦{v}</span>
                      {s.years?.[k] && <span className="scard-year">{s.years[k]}</span>}
                    </span>
                  </div>
                )) : (
                  <div className="scard-big">{s.val}</div>
                )}

                <div className="scard-subs">
                  {subs.map(t => <div key={t} className="scard-sub">{t}</div>)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="ng-toggles">
          <button className={`tog ${metric === "realGdp" ? "on" : ""}`} onClick={() => setMetric("realGdp")}>Real GDP (₦)</button>
          <button className={`tog ${metric === "nairaGdp" ? "on" : ""}`} onClick={() => setMetric("nairaGdp")}>Nominal GDP (₦)</button>
          <button className={`tog ${metric === "realPerCapita" ? "on" : ""}`} onClick={() => setMetric("realPerCapita")}>Real Per Capita (₦)</button>
          <button className={`tog ${metric === "nairaPerCapita" ? "on" : ""}`} onClick={() => setMetric("nairaPerCapita")}>Per Capita (₦)</button>
          <button className={`tog ${ratesOn ? "on" : ""}`} onClick={() => setMetric((prev) => prev === "dollarsPer1000" ? "rates" : "dollarsPer1000")}>{metric === "dollarsPer1000" ? "Dollar Per 1000" : "Rates (₦)"}</button>
          <button className={`tog ${metric === "cpi" ? "on" : ""}`} onClick={() => setMetric("cpi")}>Consumer Price Index</button>
        </div>

        {views[metric] && (
          <div className="ng-note">{views[metric].note}</div>
        )}

        <div className="ng-chart">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={data} margin={{ top: 10, right: isPhone ? 12 : 24, left: isPhone ? 0 : 8, bottom: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#151515" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: "#777", fontSize: tickSize, fontFamily: "monospace" }} tickLine={false} axisLine={{ stroke: "#1a1a1a" }} interval={xInterval} />
              <YAxis
                tick={{ fill: "#777", fontSize: tickSize, fontFamily: "monospace" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v =>
                  metric === "realGdp" ? `₦${v.toFixed(0)}T`
                    : metric === "nairaGdp" || metric === "nairaPerCapita" || metric === "realPerCapita" ? `₦${compact.format(v)}`
                      : metric === "rates" ? `₦${v >= 10 ? Math.round(v).toLocaleString() : v.toFixed(2)}`
                        : metric === "dollarsPer1000" ? `$${v >= 10 ? Math.round(v).toLocaleString() : v.toFixed(2)}`
                          : metric === "cpi" ? v.toFixed(1)
                            : `$${v.toLocaleString()}`
                }
                width={yAxisWidth} />
              <Tooltip content={<CustomTooltip />} />
              {markers.map((e, i) => (
                <ReferenceLine key={`${e.year}-${i}`} x={e.year} stroke={e.color} strokeOpacity={0.35} strokeDasharray="4 3" strokeWidth={1} />
              ))}
              <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} fill="url(#g1)" dot={false} activeDot={{ r: 5, fill: "#f59e0b", stroke: "#000", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="ng-legend">
            {markers.map((e, i) => (
              <div key={`${e.year}-${i}`} className="ng-legend-item">
                <div className="ng-dot" style={{ background: e.color }} />
                <span className="ng-legend-text">{e.year} — {e.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ng-section">
          <div className="ng-h2">THE 6 ECONOMIC ERAS</div>
          <div className="ng-eras">
            {eras.map((e, i) => {
              const open = activeEra === i;
              const toggle = () => setActiveEra(open ? null : i);

              return (
                <div
                  key={i}
                  className="era"
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  onClick={toggle}
                  onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && toggle()}
                  style={{ "--c": e.color }}
                >
                  <div className="era-top">
                    <span className="era-pill">{e.range}</span>
                    <span className={`era-chev ${open ? "open" : ""}`}>▾</span>
                  </div>

                  <div className="era-title">{e.label}</div>

                  <div className="era-desc-wrap" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                    <div className="era-desc-inner">
                      <div className="era-desc">{e.desc}</div>
                    </div>
                  </div>

                  <div className="era-hint">
                    {open ? "Click to collapse ↑" : "Click to expand ↓"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ng-section">
          <div className="ng-h2">THE NAIRA TIME MACHINE</div>
          <div className="tm-card">
            <form onSubmit={handleSubmit}>
              <div className="tm-row">
                <div className="tm-field">
                  <label className="tm-label" htmlFor="fromYear">From Year</label>
                  <input className="tm-input" type="number" id="fromYear" min="1960" max={latestYear} placeholder="1960" value={fromYear} onChange={handleYear} />
                  {errorMessage && <span className="tm-error">{errorMessage}</span>}
                </div>
                <div className="tm-field">
                  <label className="tm-label" htmlFor="toYear">To Year</label>
                  <input className="tm-input" type="number" id="toYear" min="1960" max={latestYear} placeholder="2025" value={toYear} onChange={handleYear} />
                </div>
              </div>

              <div className="tm-row">
                <div className="tm-field">
                  <label className="tm-label" htmlFor="toAmount">Amount (₦)</label>
                  <input className="tm-input" type="number" id="toAmount" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
              <button className="tm-btn" type="submit">Calculate</button>
            </form>

            <div className="tm-result">
              {result !== null
                ? `What cost ₦${textAmount} in ${textFrom} costs ₦${result} now. Prices up ${percentGrowth}%, buying power down ${buyingPower}%.`
                : "Fill in the years and an amount, then press Calculate."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}