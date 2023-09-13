select
  cron.schedule(
    'realod-every-month', 
    '0 0 */15 * *', --fifth days
    $$
      insert into nothing (value) values (2)
    $$
  );
