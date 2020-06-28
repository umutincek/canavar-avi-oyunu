new Vue({
    el: "#app",
    data: {
        myHealth: 100,
        monsterHealth: 100,
        isStartGame: false,
        logs: [],
        attackMultiple: 10,
        monsterAttackMultiple: 15,
        specialAttackMultiple: 25,
        healUpMultiple: 20,
        logText: {
            attack: "OYUNCU ATAĞI: ",
            monsterAttack: "CANAVAR ATAĞI: ",
            specialAttack: "ÖZEL OYUNCU ATAĞI: ",
            healUp: "İLK YARDIM: ",
            giveUp: "OYUNCU PES ETTİ!!"
        }
    },
    methods: {
        startGame : function() {
            this.isStartGame = true;
        },

        attack : function() {
            var point = Math.ceil(Math.random() * this.attackMultiple);
            this.monsterHealth -= point;
            this.addToLog({
                turn: "p",
                text: this.logText.attack + point
            });
            this.monsterAttack();
        },

        monsterAttack : function() {
            var point = Math.ceil(Math.random() * this.monsterAttackMultiple);
            this.myHealth -= point;
            this.addToLog({
                turn: "m",
                text: this.logText.monsterAttack + point
            });
        },

        specialAttack : function() {
            var point = Math.ceil(Math.random() * this.specialAttackMultiple);
            this.monsterHealth -= point;
            this.addToLog({
                turn: "p",
                text: this.logText.specialAttack + point
            });
            this.monsterAttack();
        },

        healUp : function() {
            var point = Math.ceil(Math.random() * this.healUpMultiple);
            this.myHealth += point;
            this.addToLog({
                turn: "p",
                text: this.logText.healUp + point
            });
            this.monsterAttack();
        },

        giveUp : function() {
            this.myHealth = 0;
            this.addToLog({
                turn: "p",
                text: this.logText.giveUp
            });
        },

        addToLog : function(log) {
            this.logs.push(log);
        }
    },
    watch: {
        myHealth : function(value) {
            if(value <= 0) {
                this.myHealth = 0;
                if(confirm("Oyunu kaybettiniz. Tekrar denemek ister misiniz ?")) {
                    this.myHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                }
            } else if(value >=100) {
                this.myHealth = 100;
            }
        },

        monsterHealth : function(value) {
            if(value <= 0) {
                this.monsterHealth = 0;
                if(confirm("Oyunu kazandınız. Tekrar denemek ister misiniz ?")) {
                    this.myHealth = 100;
                    this.monsterHealth = 100;
                    this.logs = [];
                }
            }
        }
    },
    computed: {
        myProgress : function() {
            return {
                width: this.myHealth + "%"
            }
        },
        monsterProgress : function() {
            return {
                width: this.monsterHealth + "%"
            }
        }
    }
})