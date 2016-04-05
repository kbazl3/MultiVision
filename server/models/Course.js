var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
            Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013'), tags: ['C#']});
            Course.create({title: 'Super Duper Expert Angular', featured: false, published: new Date('1/5/2015'), tags: ['Angular']});
            Course.create({title: 'Visual Basic for Basically Visual Developers', featured: false, published: new Date('4/5/2016'), tags: ['VB']});
            Course.create({title: 'A survival Guide to Code Reveiews', featured: true, published: new Date('10/5/2013'), tags: ['Coding']});
            Course.create({title: "Writing Code that Doesn't Suck", featured: true, published: new Date('10/5/2013'), tags: ['C#']});
            Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
            Course.create({title: 'Javascript for Senior Citizens', featured: true, published: new Date('10/5/2013'), tags: ['JS']});
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;
