function createStorage(key){
    const store = JSON.parse(localStorage.getItem(key)) ?? {}

    const save = () =>{
        localStorage.setItem(key, JSON.stringify(store))
    }
    
    const storerage = {
        get(key){
            return store[key];
        },
        set(key, value){
            store[key] = value
            save()
        },
        remove(key){
            delete store[key]
            save()
        }
    }

    return storerage
}
console.log('VY')
const profileSetting = createStorage('profile_setting')
console.log(profileSetting.get('fullname'))

profileSetting.set('fullname', 'Vycute')
profileSetting.set('age', 20)


// App

function createApp(){
    const cars = [];

    return {
        add(car){
            cars.push(car)
        },
        show(){
            console.log(cars)
        }
    }
}

const app = createApp();

app.add("HOnda")
app.add("BMV")
app.show()