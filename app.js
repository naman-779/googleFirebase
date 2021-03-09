// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyD5rvJtzptxIt1IFePdpOjhJmricmpBuvY",
        authDomain: "fir-authetication-6b8f7.firebaseapp.com",
        projectId: "fir-authetication-6b8f7",
        storageBucket: "fir-authetication-6b8f7.appspot.com",
        messagingSenderId: "883400147651",
        appId: "1:883400147651:web:dbb29f35735c8c23d25876",
        measurementId: "G-ZFNCSW5XEJ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const rootRef = database.ref('users');

    const textEmail = document.getElementById("txtEmail");
    const UID = document.getElementById("UID");
    const textPassword = document.getElementById("txtPassword");
    const buttonLogin = document.getElementById("buttonLogin");
    const buttonSignUp = document.getElementById("buttonSignUp");
    const buttonLogOut = document.getElementById("buttonLogOut");
    const DOB = document.getElementById("DOB");
    const Address = document.getElementById("Address");
    const POB = document.getElementById("POB");
    const phone = document.getElementById("phone");
    const detailsemail = document.getElementById("details-email");
    const detailsphone = document.getElementById("details-phone");
    const detailspob = document.getElementById("details-pob");
    const detailsdob = document.getElementById("details-dob");
    const detailsaddress = document.getElementById("details-address");


    buttonLogin.addEventListener('click', e=>{
        const id = UID.value;
        const email = textEmail.value;
        const pass = textPassword.value;
        const auth = firebase.auth();

        firebase.database().ref('users/' + id).once("value", snap=>{
                if(snap.val()){
                    var demail = snap.val().email;
                    if(email!=demail){
                        window.alert("Wrong User ID or email");
                    }else{
                        const promise = auth.signInWithEmailAndPassword(email, pass);
                        promise.catch(e=>window.alert("Invalid Email or Password"));
                    }
                }else{
                    window.alert("This UID does not exist");
                }
                
            }).catch(err =>{
            window.alert("Wrong User ID");
        });
    });


    buttonSignUp.addEventListener('click', e=>{
        
        const id = UID.value;
        const email = textEmail.value;
        const pass = textPassword.value;
        const auth = firebase.auth();
        
        DOB.classList.remove('hide');
        Address.classList.remove('hide');
        POB.classList.remove('hide');
        phone.classList.remove('hide');


        //Storing in Database
        rootRef.child(id).set({
            email : email,
            dob : DOB.value,
            address : Address.value,
            pob : POB.value,
            phone : phone.value
        });



        buttonSignUp.addEventListener('click', e=>{
            auth.createUserWithEmailAndPassword(email, pass)
            .catch(e=>console.log(e.message));
        });

    });

    buttonLogOut.addEventListener('click', e=>{
        firebase.auth().signOut()
        .then(e=>{
            textEmail.classList.remove('hide');
            UID.classList.remove('hide');
            textPassword.classList.remove('hide');
            textEmail.value = "";
            textPassword.value = "";
            UID.value = "";
            DOB.classList.add('hide');
            POB.classList.add('hide');
            Address.classList.add('hide');
            phone.classList.add('hide');

            detailsemail.classList.add('hide');
            detailspob.classList.add('hide');
            detailsdob.classList.add('hide');
            detailsphone.classList.add('hide');
            detailsaddress.classList.add('hide');


            window.alert("User SignedOut");
        })
    })

    firebase.auth().onAuthStateChanged(fireBaseUser =>{
        const id = UID.value;
        if(fireBaseUser){
            window.alert("User Logged in");
            detailsemail.classList.remove('hide');
            detailspob.classList.remove('hide');
            detailsdob.classList.remove('hide');
            detailsphone.classList.remove('hide');
            detailsaddress.classList.remove('hide');

            firebase.database().ref('users/' + id).once("value", snap=>{
                console.log(snap.val());
                var daddress = snap.val().address;
                var demail = snap.val().email;
                var dpob = snap.val().pob;
                var dphone = snap.val().phone;
                var ddob = snap.val().dob;

                detailsemail.innerHTML = "Email : " + demail;
                detailsdob.innerHTML = "Date of Birth : " + ddob;
                detailspob.innerHTML = "Place of Birth : " + dpob;
                detailsphone.innerHTML = "Phone No.  : " + dphone;
                detailsaddress.innerHTML = "Address : " + daddress;
                
            });

            UID.classList.add('hide');
            textEmail.classList.add('hide');
            textPassword.classList.add('hide');
            DOB.classList.add('hide');
            Address.classList.add('hide');
            POB.classList.add('hide');
            phone.classList.add('hide');
            

            
            buttonLogOut.classList.remove('hide');
            buttonLogin.classList.add('hide');
            buttonSignUp.classList.add('hide');

        }
        else {
            console.log("Not logged in");
            buttonLogOut.classList.add('hide');
            buttonLogin.classList.remove('hide');
            buttonSignUp.classList.remove('hide');
        }
    })