'use strict';

/*
* This JS prototype can be used when setters and getters are needed.
* The m_ naming convention refers to member/private components that should not be called directly
* */

function Accessor () {
    this.value = false;
}

/*
 * Key is an optional param that can be passed to recall from web storage
 */
Accessor.prototype.get = function(key) {
    if(key && !this.value) {
        if(!this.session || !this.local) {
            this._initWebStorage();
        }

        if(this.session && this.session.get(key)) {
            this.value = this.session.get(key);
        } else if(this.local && this.local.get(key)) {
            this.value = this.local.get(key);
        }
    }

    return this.value;
};

/*
* Key is an optional param that can be passed to set in web storage
*/
Accessor.prototype.set = function(val, key) {
    this.value = val;

    if(key) {
        this._setInLocal(key, val);
        this._setInSession(key, val);
    }

    return true;
};

/*
* Key is an optional param that can be passed to clear web storage
*/
Accessor.prototype.clear = function(key) {
    this.value = false;

    if(key) {
        if(!this.session || !this.local) {
            this._initWebStorage();
        }

        this.local.remove(key);
        this.session.remove(key);
    }
};

Accessor.prototype._setInLocal = function(key, val) {
    if(!this.local) {
        this._initWebStorage();
    }

    this.local.set(key, val);
};

Accessor.prototype._setInSession = function(key, val) {
    if(!this.session) {
        this._initWebStorage();
    }

    this.session.set(key, val);
};

Accessor.prototype._initWebStorage = function() {
    this.local = new WebStorage('localStorage');
    this.session = new WebStorage('sessionStorage');
};
