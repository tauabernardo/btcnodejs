import chalk from 'chalk';
import figlet from 'figlet';
import axios from 'axios';


// Função para mostrar ASCII art no topo
function showBanner() {
  console.log(
    chalk.yellow(
      figlet.textSync("BTC Node", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
}

// Função para obter preço do BTC (em BRL e USD)
async function getBTCPrice() {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl,usd"
    );
    const price = res.data.bitcoin;
    return price;
  } catch (error) {
    console.error(chalk.red("Erro ao buscar o preço do BTC"), error);
    return null;
  }
}

// Simulação de dados da blockchain (poderia vir do bitcoin-cli futuramente)
function showFakeBlockchainData() {
  const block = 837492; // pode ser dinâmico se usar bitcoin-cli depois
  const difficulty = 49420312992032.2;

  console.log(chalk.blueBright("📦 Bloco atual:"), chalk.white(block));
  console.log(chalk.blueBright("📈 Dificuldade:"), chalk.white(difficulty));
  console.log(chalk.greenBright("🌐 Status da rede:"), chalk.white("OK ✅"));
}

async function main() {
  showBanner();
  const price = await getBTCPrice();

  if (price) {
    console.log(
      chalk.cyan("💰 Preço do BTC:"),
      chalk.green(`R$ ${price.brl.toLocaleString("pt-BR")}`),
      chalk.gray(`(USD $${price.usd})`)
    );
  }

  console.log("\n" + chalk.magenta("📊 Dados da Blockchain:"));
  showFakeBlockchainData();
}

main();
