const Discord = require("discord.js");

const { config } = require("./config.json");

const fs = require("fs");

function returnData(url, encoding) {
    return JSON.parse(fs.readFileSync(url, encoding));
}

function writeData(url, data) {
    fs.writeFileSync(url, JSON.stringify(data));
}

const levelsArray = [3, 6, 9, 12, 15, 1000];

const Client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

Client.on("ready", (client) => {
    console.log(client.user.tag + " is now online!");
});

Client.on("messageCreate", async (message) => {
    const tagToSplit = message.mentions.users.map(user => {
        return  "<@"+user.id+"> ";
    })

    const command = message.content.toLowerCase().split(tagToSplit)[1];

    const partes = command.trim().split(" ");

    if (message.author.bot == false && partes[0] == "!comandocomumnomerealmentemuuitolongolongolongolongo") {
        message.reply("resposta ok");
    }

    // if (message.author.bot == false && userInput != "!level") {
    //     let data = returnData("./level.json", "utf-8");

    //     if (data == undefined) {
    //         console.log("data is undefined");
    //         return;
    //     }

    //     if (data.length > 0) {
    //         let found = false;

    //         for (let i = 0; i < data.length; i++) {
    //             if (message.author.id == data[i].userID) {
    //                 found = true;
    //                 data[i].exp++;
    //                 writeData("./level.json", JSON.stringify(data));
    //                 i = data.length;
    //             }
    //         }

    //         if (found == false) {
    //             const newUser = {
    //                 "userID": message.author.id,
    //                 "exp": 1
    //             }
    
    //             data = [newUser];
    
    //             writeData("./level.json", JSON.stringify(data));
    //         }
    //     }

    //     if (data.length <= 0) {
    //         const newUser = {
    //             "userID": message.author.id,
    //             "exp": 1
    //         }

    //         data = [newUser];

    //         writeData("./level.json", JSON.stringify(data));
    //     }
    // }

    // if (message.author.bot == false && userInput == "!level") {
    //     const data = returnData("./level.json", "utf-8");

    //     console.log(data.length);

    //     for (i = 0; i < data.length; i++){
    //         console.log(data[i].userID);
    //         if (message.author.id == data[i].userID) {
    //             console.log("okj");

    //             for (let j = 0; j < levelsArray.length; j++) {
    //                 if (data[i].exp < levelsArray[j]) {
    //                     message.reply("Your level is " + ++j);
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // }

    // if (message.author.bot == false && userInput == "!hey") {
    //     message.reply("hi there!");
    // }
})

Client.on("guildMemberAdd", (guildMember) => {
    // bot vai mandar mensagem somente para o usuário e nao no chat
    if (guildMember.user.bot == false) {
        guildMember.send("Welcome to the server!");
    }
    
    // lista todos os canais do servidor
    // guildMember.guild.channels.fetch().then(channels => console.log(channels)).catch(console.error);

    // manda no chat que a pessoa entrou
    // guildMember.guild.channels.fetch("id").then(channel => channel.send("Welcome to the server! <@" + guildMember.id + ">")).catch(console.error);

    // informa no canal administrativo que alguém entrou no servidor
    // guildMember.guild.channels.fetch("id")
    //     .then(channel => channel.send(guildMember.user.tag + " Joined the server. Date & Time " + new Date(guildMember.joinedTimestamp)))
    //     .catch(console.error);

});

Client.login(config);