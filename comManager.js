
//Récupére un Message et renvoie les données triées (commandes, arguments ...)
const grpA = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cc5146384bebfe34318ed3726b48bac0e';
const grpB = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cc16ee3277da469c7';
const grpC = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357c10c1ea526314239ac6a0b3f5de1b13ef';
const grpD = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc798b91b49da941ad08d3f4109b6629391';
const grpE = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cabecce7ff5f6f2ab';
const grpA2 = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357c62cb86ec8c16d178';
const grpB2 = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357cb2303500e1f29a3a';
const grpC2 = 'https://proseconsult.umontpellier.fr/jsp/custom/modules/plannings/direct_cal.jsp?data=5e3670a1af6484011850addbbf026abb1801c9e8db0d8cf6680e09872cce84f9e0fa50826f0818af16cfc8af7aef7fd1906f45af276f59aec18424f8595af9f9a6b28cb855546dc78f432a5cf2dd357c217a27bacc66eb60';

function Command(message){

    this.dataNumber = message.content.split(' ').length;
    console.log('Nombre d\'arguments : ' + this.dataNumber);

    this.arg1 = this.dataNumber > 1 ?  message.content.split(' ')[1].toUpperCase() : "";
    console.log('Argument 1 : ' + this.arg1);

    this.arg2 = this.dataNumber > 2 ?  message.content.split(' ')[2].toUpperCase() : "";
    console.log('Argument 2 : ' + this.arg2);

    this.roles = message.member.roles;

    var url = null;

    // SI UN GROUPE SPECIFIQUE A ETE DONNE :
    if(this.arg1 === 'A' || this.arg1 === 'B' || this.arg1 === 'C' || this.arg1 === 'D' || this.arg1 === 'E' || this.arg1 === 'A2' || this.arg1 === 'B2' || this.arg1 === 'C2'){

        console.log("----- Un groupe a été choisi : " + this.arg1);
        console.log("----- Attribution d'un URL .ics");

        this.grp = this.arg1 == 'A' ? grpA : 
                        this.arg1 == 'B' ? grpB :
                            this.arg1 == 'C' ? grpC :
                                this.arg1 == 'D' ? grpD : 
                                    this.arg1 == 'E' ? grpE :
                                        this.arg1 == 'A2' ? grpA2 : 
                                            this.arg1 == 'B2' ? grpB2 :
                                                this.arg1 == 'C2' ? grpC2 : '';
    
        console.log('----- URL donnée : ' + this.grp);
    }
    else //SI AUCUN GROUPE PRECISE, IL FAUT CHERCHER UN ROLE :
    {
        console.log('----- Pas de groupe précisé, je cherche un groupe ...');

        this.roles.forEach(function(element){
            
                switch (element.name) {
                    case 'L1-Groupe-A':
                        url = grpA;
                        break;
                    
                    case 'L1-Groupe-B':
                        url = grpB;
                        break;
            
                    case 'L1-Groupe-C':
                        url = grpC;
                        break;
            
                    case 'L1-Groupe-D':
                        url = grpD;
                        break;
            
                    case 'L1-Groupe-E':
                        url = grpE;
                        break;
            
                    case 'L2-Groupe-A':
                        url = grpA2;
                        break;
            
                    case 'L2-Groupe-B':
                        url = grpB2;
                        break;
            
                    case 'L2-Groupe-C':
                        url = grpC2;
                        break;
                }   
        });

        this.grp = url;
        console.log('GROUPE trouvé selon un role : ' + this.grp);
    }

}


module.exports = {
    Command : Command
}
