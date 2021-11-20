require('dotenv').config();
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const formidable = require('formidable');
const fs = require('fs');
const extract = require('extract-zip');
const app = express();
const config = require('./config');
const helpers = require('./helpers');
const dataUtilities = require('./data');

const workers = require('./workers');

const ogr2ogr = require('ogr2ogr').default;

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.options('*', (req, res) => {
  res.writeHead(200, '', {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
  }).end();
});

app.get('/listProjects', function(req, res) {
  let dbConnection = dataUtilities.dbObject;
  dbConnection.serialize(function(){
    let data = [];
    let sqlQuery = `SELECT * FROM projects WHERE status = 1 ORDER BY id, project_name`;
    dbConnection.all(sqlQuery, (errQuery, rowsQuery) => {
      if (errQuery){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      if(rowsQuery){
        rowsQuery.forEach(rowData => {
          data.push({"id":rowData.id,"codex":rowData.codex,"project_name":rowData.project_name,"status":rowData.status});
        });
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        let payloadString = JSON.stringify({"code": 200, "message": "success", "data": data});
        return res.end(payloadString);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        let payloadString = JSON.stringify({"code": 200, "message": "success", "data": []});
        return res.end(payloadString);
      }
    });
  });
});

app.post('/createProject', function(req, res) {
  let dbConnection = dataUtilities.dbObject;
  let project_name = req.body.project_name;
  let cDT = Date.now();
  let hashedDatetime = helpers.hash(cDT.toString());
  let codex = hashedDatetime.substring(0, 12);
  dbConnection.serialize(function(){
    let data = [];
    let sqlInsertQuery = `INSERT INTO projects(codex,project_name,status) VALUES(?,?,1)`;
    let sqlListQuery = `SELECT * FROM projects WHERE status = 1 ORDER BY id, project_name`;
    dbConnection.run(sqlInsertQuery, [codex, project_name], (errInsertQuery) => {
      if (errInsertQuery){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      dbConnection.all(sqlListQuery, (errListQuery, rowsListQuery) => {
        if (errListQuery){
          res.writeHead(500, '', {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
          });
          return res.end();
        }
        if(rowsListQuery){
          rowsListQuery.forEach(rowData => {
            data.push({"id":rowData.id,"codex":rowData.codex,"project_name":rowData.project_name,"status":rowData.status});
          });
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, '', {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
          });
          let payloadString = JSON.stringify({"code": 200, "message": "success", "codex": codex, "data": data});
          return res.end(payloadString);
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(200, '', {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
          });
          let payloadString = JSON.stringify({"code": 200, "message": "success", "codex": codex, "data": []});
          return res.end(payloadString);
        }
      });
    });
  });
});

app.post('/updateProject', function(req, res) {
  let dbConnection = dataUtilities.dbObject;
  let project_id = req.body.project_id;
  let project_name = req.body.project_name;
  dbConnection.serialize(function(){
    let data = [];
    let sqlQuery = `UPDATE projects SET project_name = ? WHERE id = ?`;
    dbConnection.run(sqlQuery, [project_name, project_id], (errQuery) => {
      if (errQuery){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200, '', {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
      });
      let payloadString = JSON.stringify({"code": 200, "message": "success", "data": {"project_name": project_name}});
      return res.end(payloadString);
    });
  });
});

app.post('/removeProject', function(req, res) {
  let dbConnection = dataUtilities.dbObject;
  let project_id = req.body.project_id;
  dbConnection.serialize(function(){
    let data = [];
    let sqlQuery = `DELETE FROM projects WHERE id = ?`;
    dbConnection.run(sqlQuery, [project_id], (errQuery) => {
      if (errQuery){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200, '', {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
      });
      let payloadString = JSON.stringify({"code": 200, "message": "success", "data": {}});
      return res.end(payloadString);
    });
  });
});

app.post('/resetProjects', function(req, res) {
  let dbConnection = dataUtilities.dbObject;
  dbConnection.serialize(function(){
    let data = [];
    let sqlQueryClearFiles = `SELECT * FROM workspaces ORDER BY id`;
    let sqlQueryDelete = `DELETE FROM projects WHERE id > 1`;
    let sqlQueryUpdateSeq = `UPDATE sqlite_sequence SET seq = 1 WHERE name = 'projects'`;
    let sqlQueryDeleteW = `DELETE FROM workspaces`;
    let sqlQueryUpdateSeqW = `DELETE FROM sqlite_sequence WHERE name = 'workspaces'`;
    
    dbConnection.all(sqlQueryClearFiles, (errQueryClearFiles, rowsQueryClearFiles) => {
      if (errQueryClearFiles){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      if(rowsQueryClearFiles){
        /* always sync to workspace table fields! */
        rowsQueryClearFiles.forEach(rowData => {
          fs.unlinkSync(path.join(__dirname, config.baseGeoJSONDir + rowData.codex +'.json'));
        });
        return true;
      } else {
        return false;
      }
    });
    
    dbConnection.run(sqlQueryDelete, (errQueryDelete) => {
      if (errQueryDelete){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      dbConnection.run(sqlQueryUpdateSeq, (errQueryUpdateSeq) => {
        if (errQueryUpdateSeq){
          res.writeHead(500, '', {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
          });
          return res.end();
        }
        dbConnection.run(sqlQueryDeleteW, (errQueryDeleteW) => {
          if (errQueryDeleteW){
            res.writeHead(500, '', {
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
            });
            return res.end();
          }
          dbConnection.run(sqlQueryUpdateSeqW, (errQueryUpdateSeqW) => {
            if (errQueryUpdateSeqW){
              res.writeHead(500, '', {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
              });
              return res.end();
            }
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, '', {
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
            });
            let payloadString = JSON.stringify({"code": 200, "message": "success", "data": {}});
            return res.end(payloadString);
          });
        });
      });
    });
  });
});

app.post('/listWorkspaces', function(req, res) {
  let userid = req.body.userid;
  let project_codex = req.body.project_codex;
  let dbConnection = dataUtilities.dbObject;
  dbConnection.serialize(function(){
    let data = [];
    let sqlQuery = `SELECT * FROM workspaces WHERE userid = ? AND project_codex = ? ORDER BY workspace_name`;
    dbConnection.all(sqlQuery, [userid, project_codex], (errQuery, rowsQuery) => {
      if (errQuery){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      if(rowsQuery){
        /* always sync to workspace table fields! */
        rowsQuery.forEach(rowData => {
          data.push({
            "id": rowData.id,
            "userid": rowData.userid,
            "project_codex": rowData.project_codex,
            "codex": rowData.codex,
            "workspace_name": rowData.workspace_name,
            "osm_status": rowData.osm_status,
            "status": rowData.status
          });
        });
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        let payloadString = JSON.stringify({"code": 200, "message": "success", "data": data});
        return res.end(payloadString);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        let payloadString = JSON.stringify({"code": 200, "message": "success", "data": []});
        return res.end(payloadString);
      }
    });
  });
});

app.route('/uploadSHP').post(function(req, res) {
  let form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, config.uploadedFileDir), 
    maxFileSize: 500 * 1024 * 1024
  });
  form.parse(req, function(err, fields, files){
    let project_codex = fields.project_codex;
    let workspace_name = fields.workspace_name;
    let fileExt = helpers.fileExtensionType(files.filetoupload.type);
    let hashedFilename = helpers.hash(files.filetoupload.name +''+ files.filetoupload.mtime +''+ files.filetoupload.path);
    let cFilename = hashedFilename.substring(0, 12);
    let uFilename = cFilename + fileExt;
    let jFilename = cFilename + '.json';
    let tmppath = files.filetoupload.path;
    let newpath = config.fileUploadDir + uFilename;
    let newTempPath = config.fileUploadTempDir + uFilename;
    let newExtractTargetDir = config.fileUploadDir + cFilename;
    if(!fs.existsSync(path.join(__dirname, newExtractTargetDir))){
      fs.mkdirSync(path.join(__dirname, newExtractTargetDir), { recursive: true, mode: 0o777});
    }
    fs.rename(tmppath, path.join(__dirname, newTempPath), async function(errRename){
      if (errRename){
        res.writeHead(500, '', {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        });
        return res.end();
      }
      await extract(path.join(__dirname, newTempPath), { dir: path.resolve(path.join(__dirname, newExtractTargetDir))});
      let extractedFiles = fs.readdirSync(path.join(__dirname, config.extractFileTargetDir + cFilename));
      let trimmedFileName = [];
      let regexpPattern = /\..+$/;
      extractedFiles.forEach(function(eachFile){
        trimmedFileName.push(eachFile.replace(regexpPattern,''));
      });
      ogr2ogr(path.join(__dirname, config.extractFileTargetDir + cFilename +'/'+ trimmedFileName[0] +'.shp')).exec((err, {data}) => {
        let postProcessedData = dataUtilities.wrangleData(cFilename, data);
        dataUtilities.create('files', cFilename, postProcessedData, function(errFileCreate){
          if(!errFileCreate){
            /* deleting extracted shapefiles directory */
            //fs.rmSync(path.join(__dirname, config.extractFileTargetDir + cFilename), { recursive: true, force: true });
            /* deleting uploaded (+compressed) shapefile */
            //fs.unlinkSync(path.join(__dirname, config.uploadedFileDir + uFilename));
            /* database access */
            let dbConnection = dataUtilities.dbObject;
            dbConnection.serialize(function(){
              let data = [];
              let sqlQuery = `INSERT INTO workspaces(project_codex,codex,workspace_name,dir_name,status) VALUES(?,?,?,?,1)`;
              let sqlQueryListWks = `SELECT * FROM workspaces WHERE project_codex = ? ORDER BY workspace_name`;
              dbConnection.run(sqlQuery, [project_codex, cFilename, workspace_name, cFilename], (errQuery) => {
                if (errQuery){
                  res.writeHead(500, '', {
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
                  });
                  return res.end();
                }
                dbConnection.all(sqlQueryListWks, [project_codex], (errListWQuery, rowsListWQuery) => {
                  if (errListWQuery){
                    res.writeHead(500, '', {
                      'Access-Control-Allow-Origin': '*', 
                      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
                      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
                    });
                    return res.end();
                  }
                  if(rowsListWQuery){
                    rowsListWQuery.forEach(rowData => {
                      data.push({
                        "id": rowData.id,
                        "project_codex": rowData.project_codex,
                        "codex": rowData.codex,
                        "workspace_name": rowData.workspace_name,
                        "osm_status": rowData.osm_status,
                        "status": rowData.status
                      });
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200, '', {
                      'Access-Control-Allow-Origin': '*', 
                      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
                      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
                    });
                    let payloadString = JSON.stringify({"code": 200, "message": "success", "data": data});
                    return res.end(payloadString);
                  } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200, '', {
                      'Access-Control-Allow-Origin': '*', 
                      'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
                      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
                    });
                    let payloadString = JSON.stringify({"code": 200, "message": "Error: Listing workspaces failed.", "data": []});
                    return res.end(payloadString);
                  }
                });
              });
            });
          } else {
            res.writeHead(500, '', {
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Headers': 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Accept,Range', 
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
            });
            return res.end();
          }
        });
      });
    });
  });
});

app.listen(process.env.APP_PORT, function () {
  console.log('\x1b[36m%s\x1b[0m', 'Local-isolated server is running @port '+ process.env.APP_PORT +'...');
  workers.init();
});

module.exports = app;
