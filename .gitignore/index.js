const Discord = require('discord.js');
const bot = new Discord.Client();
const ical = require('node-ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const grpA = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cc5146384bebfe34318ed3726b48bac0e';
const grpB = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cc16ee3277da469c7';
const grpC = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357c10c1ea526314239ac6a0b3f5de1b13ef';
const grpD = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357c07aa135b8cfb2087';
const grpE = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cabecce7ff5f6f2ab';


bot.on('ready', function(){
    console.log('Ready to use!');
});

bot.on('message', message =>{

    var chan = message.channel;

    if(message.content.split(' ')[0] === '!edt'){
        var arg1 = message.content.split(' ')[1].toUpperCase();
        var arg2 = message.content.split(' ').length > 1 ? message.content.split(' ')[2] : '';

        //console.log('Arg 1 = ' + arg1 + ' Arg 2 : ' + arg2);
        var nbDeJours = 0;

        try {
            
            if(arg2 != null)   
                if(arg2.startsWith('+'))
                    for(let i = 0; i < arg2.length; i++)
                        nbDeJours++;
            

            console.log('Arg2 = ', arg2, ' ', nbDeJours, ' jours ont été ajoutés');

            console.log('Groupe selectionne : ' + arg1);

            var grp = arg1 == 'A' ? grpA : 
                    arg1 == 'B' ? grpB :
                        arg1 == 'C' ? grpC :
                            arg1 == 'D' ? grpD :
                                grpE;

            try {

                var today = new Date();

                if(arg2 != null)
                    today.setDate(today.getDate() + nbDeJours);

                var todayString = today.toDateString().split(' ')[1] + ' ' + today.toDateString().split(' ')[2] + ' 2019';
                console.log('-----> ' + todayString);

                let day = today.toString().split(' ');
                chan.send('\n:calendar_spiral: **' + day[0] + ' ' + day[1] + ' ' + day[2]+'**');

                ical.fromURL(grp, {}, function(err, data) {

                    for (var k in data){
                        if (data.hasOwnProperty(k)) {

                            var ev = data[k];
                            
                            var iDate = months[ev.start.getMonth()] + ' ' + ev.start.getDate() + ' 2019';
                            //console.log(iDate);

                            if(todayString === iDate){
                                //console.log('TEST ---------' + ev.start.toString().split(' ')[4]);

                                let start = ev.start.toDateString().split('GMT')[0];
                                let startHour = ev.start.toString().split(' ')[4];

                                let end = ev.end.toDateString().split('GMT')[0];
                                let endHour = ev.end.toString().split(' ')[4];


                                let module = ev.summary.toString().split(' ')[0];
                                let salle = ev.location;
                                let description = ev.description;

                                chan.send('\t\t' + startHour + '-' + endHour +'\n'
                                                +'\t\t **UE :** ' + module +'\n'
                                                    +'\t\t **Salle :** ' + salle);                            
                            } 
                        }
                    }
                });

            } catch (error){
                console.log(error);
            }
        } catch (error) {
            console.log(error);
            chan.send("Aucun groupe n'a été sélectionné :/");
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

        message.channel.send('!edt [groupe] [ajouter un/plusieurs jours]\n**EXEMPLE :** !edt a ++ --> EDT du groupe A dans 2 jours');
    }
        
});


bot.login(process.env.TOKEN);
