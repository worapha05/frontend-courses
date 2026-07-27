import { useQuery } from '@apollo/client';

import { GET_CONTINENTS, GET_COUNTRY } from './operations';

type ContinentsData = {
  continents: Array<{ code: string; name: string }>;
};

type CountryData = {
  country: {
    code: string;
    name: string;
    capital: string | null;
    currency: string | null;
    continent: { name: string };
  } | null;
};

export function ContinentList() {
  const { data, loading, error } = useQuery<ContinentsData>(GET_CONTINENTS);

  if (loading) return <p>กำลังโหลดทวีป…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.continents.map((c) => (
        <li key={c.code}>
          {c.code} — {c.name}
        </li>
      ))}
    </ul>
  );
}

export function CountryPanel({ code }: { code: string }) {
  const { data, loading, error } = useQuery<CountryData>(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>โหลดประเทศ…</p>;
  if (error) return <p>{error.message}</p>;
  if (!data?.country) return <p>ไม่พบประเทศ</p>;

  const { country } = data;
  return (
    <article>
      <h3>
        {country.name} ({country.code})
      </h3>
      <p>เมืองหลวง: {country.capital ?? '-'}</p>
      <p>สกุลเงิน: {country.currency ?? '-'}</p>
      <p>ทวีป: {country.continent.name}</p>
    </article>
  );
}
