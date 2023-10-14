console.log(1);
(async () => {
  console.log(2);

  const res = await fetch(
    'https://groww.in/v1/api/charting_service/v2/chart/exchange/NSE/segment/CASH/HDFCBANK/1y?intervalInDays=1'
  );
  const data = await res.text();
  console.log(data);
})();
// console.log(1);
// (async () => {
//   console.log(2);

//   const res = await fetch(
//     'https://www.nseindia.com/api/chart-databyindex?index=HDFCBANKEQN',
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json, text/javascript, /; q=0.01',
//         'Accept-Encoding': 'gzip, deflate, br',
//         'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
//         Cookie: `_ga=GA1.1.289426437.1696186720; AKA_A2=A; nsit=5LL84MPVFxSiOPs1vgclGVr0; bm_mi=1C78E932DDA8E0ECF876E5E16E908A45~YAAQD6kRYCrwgBSLAQAA9YavKhUMBdn3Gh83b/gp4W2OHBgEHGhERuawsm0K49wf2OwTxWtwoadvhzhtUbz1DSvWWYdeSyurTzwgbChE/1fNQgqpRI+Ndq8EE9rOhJyEnCiExDuH9uD/d7p/6lNxv0yNnkgMAXWKdyKkro0GYw23ehHr+lYWm3y0m9oAAJoHwqRJXWn0M8lDNLaIFjj7KH0etSJSYBjVlEB+HO72YTCgA+lrRXB3mgd5XGJQhuGSp+sELO74OKq7jeKBWO8silp730noiWF7JS+4DhP+pow6Gjk4BsgsqvgnEHj6meHK~1; defaultLang=en; ak_bmsc=739B8BE2C172128F56E5F5514C745C2E~000000000000000000000000000000~YAAQD6kRYDnwgBSLAQAAs42vKhUC3Z47eS0aTD1D35vEk4/1h0ytUn8x/y08LkeNsCKSOmv9xZCY/AE6AeQTKgmj7Q4ArU5+yWFJnVy7VuqsqWwiPaHn6gaN4eb+GYNOX8amze1YNJ7hQwzG56z5ks3eBbsf92vk54iwktIGZya718HKILz+Fw/uyTMaFDqbD0NeGPa3oUzB8B7ejjJcFGFhdms0i8j8M6JwSTgfdSBzYFRXvmHuNclaZyKmX3MvywrWa/gGMsi3z3MO1tze79ls4XJ9u8FO7b8/i+DbdnNnFPgqDOxgson00gqiiWXNM++j2QGUBTJ1PZP6yB5e7/cesup2buwKclZ8LYpOf/Nb12KWyEH4W3X/J1weqIt+ZbgYiBy3vUAeMabm9aVFT6TLPtn+8b7kISfOGE9mBSgWQfQ/kuxlYctS1TdZDBdurOk0TS6Xwscnbtk4rJ2OB1Z4jfS1wDbGxThGxto1BFD/wQnzgOjwRVsro3evHoPztAlCIovy6KFQ+TMSMvwCc7QfcFIN8Q==; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY5NzIyODIzOCwiZXhwIjoxNjk3MjM1NDM4fQ.KOb3lcUsgtlfMsVWUJmzQJsWTFeV3PJKkZuTHrwl7NI; RT="z=1&dm=nseindia.com&si=0e847ab4-848a-406d-b9c5-c983bafd7b2f&ss=lnp1v62m&sl=1&se=8c&tt=3o1&bcn=%2F%2F684d0d49.akstat.io%2F"; _ga_PJSKY6CFJH=GS1.1.1697228230.4.1.1697228239.51.0.0; nseQuoteSymbols=[{"symbol":"HDFCBANK","identifier":null,"type":"equity"}]; bm_sv=C3D647576415AC6A8D9F891554D35B23~YAAQD6kRYKTwgBSLAQAA0LSvKhXAGxfZjILc0+HsdffYGkeRVMQz9QUpNFABPTXAtDbeymknLJ/+XrsVEWNIIeaIxizr+rulu2x/txf1hY7XTmilrNFq4G4sSDxIrBUSBD/SIhAu1BimhiJmnWr2bQaFowm7N1ALX9/dyPUDBrSoDNbCwjgZOKr81m3ITFwQ4k9Xms5sWXzJRi5Fp1yAdcGnl0AdikIufi54zEtFSMZSHNaQouaaV+2CufvkBMsdwHyE~1`,
//         'Sec-Ch-Ua': `"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"`,
//         'Sec-Ch-Ua-Mobile': '?1',
//         'Sec-Ch-Ua-Platform': 'Android',
//         'Sec-Fetch-Dest': 'empty',
//         'Sec-Fetch-Mode': 'cors',
//         'Sec-Fetch-Site': 'same-origin',
//         'User-Agent': `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36`,
//         'X-Requested-With': 'XMLHttpRequest',
//       },
//     }
//   );
//   const data = await res.text();
//   console.log(data);
// })();
