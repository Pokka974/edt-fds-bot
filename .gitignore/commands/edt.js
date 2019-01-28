const ical = require('node-ical');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Discord = require('discord.js');

module.exports = {

    todayEdt : function(msg, url, optionalArg){
        try {
            console.log('------START FUNCTION TODAYEDT');
            var today = new Date();

            var todayString = today.toDateString().split(' ')[1] + ' ' + today.toDateString().split(' ')[2] + ' 2019';
            console.log('-----> ' + todayString);

            let day = today.toString().split(' ');
            let courseFounded = false;

            ical.fromURL(url, {}, function(err, data) {

                for (var k in data){
                    if (data.hasOwnProperty(k)) {

                        var ev = data[k];
                        
                        var iDate = months[ev.start.getMonth()] + ' ' + ev.start.getDate() + ' 2019';

                        if(todayString === iDate){ //Si il trouve un Edt pour le jour sélectionné
                            
                            courseFounded = true;
                            let start = ev.start.toDateString().split('GMT')[0];
                            let startHour = ev.start.toString().split(' ')[4];

                            let end = ev.end.toDateString().split('GMT')[0];
                            let endHour = ev.end.toString().split(' ')[4];

                            let module = ev.summary.toString().split(' ')[0];
                            let salle = ev.location;
                            let description = ev.description;
                                                
                            var embed  = new Discord.RichEmbed()
                                .setTitle('\n:calendar_spiral: **' + day[0] + ' ' + day[1] + ' ' + day[2]+'** \n' + startHour + '-' + endHour)
                                .setDescription(module)
                                .addField('Salle', salle, true)
                                .addField('Description', ev.description)
                                .setColor('0x#ff0000')
                                .setFooter(day[0] + ' ' + day[1] + ' ' + day[2]);
                                

                            msg.channel.sendEmbed(embed);
                        }
                    }
                }

                if(!courseFounded){
                    let embed = new Discord.RichEmbed()
                            .setTitle('\n:calendar_spiral: **' + day[0] + ' ' + day[1] + ' ' + day[2]+'**')
                            .addField('No Results', 'Aucun cours trouvé pour la date indiquée et le groupe indiqué')
                            .setColor('0x#ff0000')
                            .setFooter(day[0] + ' ' + day[1] + ' ' + day[2]);

                    msg.channel.sendEmbed(embed);
                }
                
            });

        } catch (error){
            console.log(error);
        }
    },

    specificDay: function(msg, url, daysMore, optionnalArg){

        console.log('------ START FUNCTION SPECIFICDAY');
        console.log('URL : ' + url + ' DAYSMORE : ' + daysMore + ' OPTIONALARG : ' + optionnalArg);
        
        try {

            var today = new Date();
            today.setDate(today.getDate() + daysMore.length);
            
            var todayString = today.toDateString().split(' ')[1] + ' ' + today.toDateString().split(' ')[2] + ' 2019';
            console.log('-----> ' + todayString);

            let day = today.toString().split(' ');
            let courseFounded = false;
            ical.fromURL(url, {}, function(err, data) {

                for (var k in data){
                    if (data.hasOwnProperty(k)) {

                        var ev = data[k];
                        
                        var iDate = months[ev.start.getMonth()] + ' ' + ev.start.getDate() + ' 2019';

                        if(todayString === iDate){ //Si il trouve un Edt pour le jour sélectionné
                            courseFounded = true;
                            let start = ev.start.toDateString().split('GMT')[0];
                            let startHour = ev.start.toString().split(' ')[4];

                            let end = ev.end.toDateString().split('GMT')[0];
                            let endHour = ev.end.toString().split(' ')[4];

                            let module = ev.summary.toString().split(' ')[0];
                            let salle = ev.location;
                            let description = ev.description;
                                                
                            var embed2  = new Discord.RichEmbed()
                                .setTitle('\n:calendar_spiral: **' + day[0] + ' ' + day[1] + ' ' + day[2]+'** \n' + startHour + '-' + endHour)
                                .setDescription(module)
                                .addField('Salle', salle, true)
                                .addField('Description', ev.description)
                                .setColor('0x#ff0000')
                                .setFooter(day[0] + ' ' + day[1] + ' ' + day[2]);
                                

                            msg.channel.sendEmbed(embed2);
                        }
                    }
                }

                if(!courseFounded){
                    let embed = new Discord.RichEmbed()
                            .setTitle('\n:calendar_spiral: **' + day[0] + ' ' + day[1] + ' ' + day[2]+'**')
                            .addField('No Results', 'Aucun cours trouvé pour la date indiquée et le groupe indiqué')
                            .setColor('0x#ff0000')
                            .setFooter(day[0] + ' ' + day[1] + ' ' + day[2]);

                    msg.channel.sendEmbed(embed);
                }
            });

        } catch (error){
            console.log(error);
        }
    }
};

function howManyDaysMore(str){

    return str.length;
}