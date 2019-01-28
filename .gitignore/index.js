const Discord = require('discord.js');
const bot = new Discord.Client();
const ical = require('node-ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const utils = require('./comManager.js');
const edt = require('./commands/edt.js');

var grp;

bot.on('ready', function(){
    console.log('Ready to use!');
});

bot.on('message', message =>{

    var chan = message.channel;
    
    if(message.content.split(' ')[0] === '!edt'){

        var Command = utils.Command;

        let com = new Command(message);
        let arg1 = com.arg1;
        let arg2 = com.arg2;

        try {
            if(com.dataNumber < 3)                                  // !edt OU !edt ++ OU !edt D
                if(com.arg1.startsWith('+'))                        // !edt ++
                    edt.specificDay(message, com.grp, com.arg1, com.arg2);
                else                                                // !edt
                    edt.todayEdt(message, com.grp, com.arg1);
            else                                                    // !edt D ++
                edt.specificDay(message, com.grp, com.arg2, com.arg1);

        } catch (error) {
            console.log(error);
        }
       
    }

    if(message.content === '!manageMembers'){

        message.guild.roles.forEach((function(role){

            if(role.name === 'Nouveaux' || role.name === 'Les Libérés'){
                
                chan.send('Role : ' + role.name);

                role.members.forEach(function(member){

                    try {
                        console.log(' ------> ' + member.lastMessage.createdAt.getDate() + ' : ' + member.lastMessage.content);
                    } catch (error) {
                        console.log(member.displayName + ' n\'a pas envoyé de message');
                    }
                });
            }
        }));
    }

    if(message.content === '!helpedt'){

        message.channel.send('!edt [groupe] [ajouter un/plusieurs jours]\n **EXEMPLE :** !edt a ++ --> EDT du groupe A dans 2 jours');
    }
        
});


bot.login(process.env.TOKEN);