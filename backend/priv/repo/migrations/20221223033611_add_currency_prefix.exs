defmodule Trabalhando.Repo.Migrations.AddCurrencyPrefix do
  use Ecto.Migration

  def change do
    alter table(:projects) do
      add :currency_prefix, :string
    end
  end
end
