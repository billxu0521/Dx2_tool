
var url_1 = 'https://billxu0521.github.io/Dx2_tool/two_devil.csv';
var url_2 = 'https://billxu0521.github.io/Dx2_tool/all_devil.csv';
var twoDevil = {};
var allDevil = {}; //名稱 稀有度0 Grade1 種族2 類型3
var RankAllDevil = []; //重新排序的惡魔
var start = 'スライム';
var target = 'アシェラト';


    //用名字做逆二身種類查詢
    function inverseTwoDevilName(targetDevil){
    	var _type_ary = [];
    	//查詢二身表反推
		for(var key in twoDevil){
			//console.log(_key);
			for(var key_2 in twoDevil[key]){
				//console.log(twoDevil[_key][_key_2][1]);
				if(twoDevil[key][key_2][1] == allDevil[targetDevil][2]){
					//console.log(target + '/' + allDevil[target][2] + '=' + _key + '+' + twoDevil[_key][_key_2][0]);  //逆二身
					_type_ary.push([key,twoDevil[key][key_2][0]]);
				}
			}
		}
		return _type_ary;
    }
    //用種族做逆二身種類查詢
    function inverseTwoDevilTyoe(targetDevilType){
    	var _type_ary = [];
    	//查詢二身表反推
		for(var key in twoDevil){
			//console.log(key);
			for(var key_2 in twoDevil[key]){
				//console.log(twoDevil[key][key_2][1]);
				if(twoDevil[key][key_2][1] == targetDevilType){
					//console.log(target + '/' + allDevil[target][2] + '=' + _key + '+' + twoDevil[_key][_key_2][0]);  //逆二身
					_type_ary.push([key,twoDevil[key][key_2][0]]);
				}
			}
		}
		return _type_ary;
    }

    //排序
	function cus_sort(a,b) {   
	     return a[1] - b[1];      
	}  

    //從目標惡魔查詢組合
    function devilCombin(targetDevil){
    	var _type_ary = [];//升級組合表
		var _targetdevil_ary = []; //
		var _devil_pack = [];
		var _before_devil = '';//合成目標前一個惡魔
		

		_type_ary = inverseTwoDevilName(targetDevil);
		_targetdevil_ary = RankAllDevil;
		_targetdevil_ary = _targetdevil_ary.sort(function (a, b) {
					return a[1] - b[1];
				});
		//console.log(_targetdevil_ary[0]);

		//從全部惡魔找出合成目標前一個惡魔
        for(var i in _targetdevil_ary){
        	//console.log(_targetdevil_ary[i][0] + ':' + _targetdevil_ary[i][1]);
			if(allDevil[targetDevil][2] == allDevil[RankAllDevil[i][0]][2] &&  allDevil[RankAllDevil[i][0]][1] < parseInt(allDevil[targetDevil][1])){
				_before_devil = RankAllDevil[i][0];
				//console.log(_before_devil);
				//break;
			}else if(_before_devil == '' ){
				_before_devil = targetDevil;
			}
		};

		//依照garade大開始重新排序惡魔表
		//_targetdevil_ary = _targetdevil_ary.sort(function (a, b) {
		//	return a[1] - b[1];
		//});
		//console.log('target >>' + _targetdevil_ary[0]);
		console.log(_before_devil+ ':' + allDevil[_before_devil][1]);
		
		//
		for(var x in _type_ary){
			for(var i in _targetdevil_ary){
				var _first_name = _targetdevil_ary[i][0];
				if(allDevil[_first_name][2] != _type_ary[x][0]){
					continue; //無對應種族
				}

				//console.log(_first_name + '/' + allDevil[_first_name][1])
				for(var j in _targetdevil_ary){
					var _second_name = _targetdevil_ary[j][0];
					
					if(allDevil[_second_name][2] != _type_ary[x][1]){
						continue; //無對應種族
					}
					//console.log(allDevil[_second_name][2] );
					//自己跟自己不能合
					if(_targetdevil_ary[i][0] == _targetdevil_ary[j][0]){
						continue; 
					}
					
					var grade = ((parseInt(_targetdevil_ary[i][1]) + parseInt(_targetdevil_ary[j][1]))/2) + 1;
					console.log(_targetdevil_ary[i][0] + '+' + _targetdevil_ary[j][0] + ':' + (((parseInt(_targetdevil_ary[i][1]) + parseInt(_targetdevil_ary[j][1]))/2) + 1)  + '=>' +targetDevil + ':' + allDevil[targetDevil][1] + '/' + _before_devil + ':' +allDevil[_before_devil][1]);
					//console.log(grade);
					//計算grade
					if(_before_devil == targetDevil){

						if( grade > allDevil[targetDevil][1] ){
							continue; 
						}
					}else{
						if( grade <= allDevil[_before_devil][1]){
							continue; 
						}
					}
					_devil_pack.push([_first_name,_second_name]);
					//console.log(_first_name + ':' + allDevil[_first_name][1] + '|' + _second_name + ':' + allDevil[_second_name][1]);
				}
			}
		}
		//console.log(_devil_pack);
		return _devil_pack;
    }
    //顯示種族列表
    function showDevilTypeList(){
    	var _ary = [];
    	var $cSel = $('select[class="deviltypelist"]'); 

    	for(var x in allDevil){
    		_ary.push(allDevil[x][2]);
    	}

    	_ary = _ary.filter( (el, i, arr) => arr.indexOf(el) === i);
    	for(var x in _ary){
    	$cSel.append($("<option></option>")
               .attr("value",_ary[x])
               .text(_ary[x]));  
    	}
    }

    //顯示所有仲魔列表
    function showDevilList(){
    	var _ary = [];
    	var $cSel = $('select[class="devillist"]'); 
    	_ary = RankAllDevil;
		//依照garade大開始重新排序惡魔表
		_ary = _ary.sort(function (a, b) {
			return b[1] - a[1];
		});
    	for(var x in _ary){
    	
    	$cSel.append($("<option></option>")
               .attr("value",_ary[x][0])
               .text(_ary[x][0] +'|Lv:' + allDevil[_ary[x][0]][0] +'|Grade:' + _ary[x][1]));  
    	}
    }

    //查詢仲魔合成
    function checkDevilCombin(){
    	var $cSel = $('select[id="devilCombinList"]');
      	var select_option_val = $cSel.val();

		var _ary = devilCombin(select_option_val);
		var _str = '';
		_str += select_option_val + ':';
		for(var x in _ary){
			//檢查有無重複
			var _first_devil = _ary[x][0]; //第一隻
			var _second_devil = _ary[x][1]; //第二隻
			for(var y in _ary){
				if(_first_devil == _ary[y][1] && _second_devil == _ary[y][0]){
					delete _ary[y];
				}
			}
			_str += '<div>[' + _first_devil + '|Grade:' + allDevil[_ary[x][0]][1] + ']+[' + _second_devil + '|Grade:' + allDevil[_ary[x][1]][1] +']</div>';
		}
		
		$('#devilCombinshow').html(_str);
    }

    //仲魔逆二身
    function checktwoDevil(){
    	//var $cSel = $('#twoDevilList');
      	var select_option_val = $('#twoDevilList').val();
      	
		var _ary = inverseTwoDevilTyoe(select_option_val);
		var _str = '';
		_str += select_option_val + ':';
		for(var x in _ary){
			_str += '<div>' + _ary[x][0] + '+' + _ary[x][1] + '</div>';
		}
		$('#twoDevilshow').html(_str);

    }

	//找出路徑
	function setLine(){
		start = $('#startDevil').val();
		target = $('#targetDevil').val();
		
		console.log('target >>' + target + '/start >>' + start);
		var _pack_ary = [];
		var _res_ary = [];//將結果放在這邊
		//_pack_ary = Devilcombin(target);
		var index = 1;
		var _ary = [];
		var _str = '';
		while(1){
			if(index == 1){
				_str = _str + index + ':';
				_pack_ary = devilCombin(target);
				for(var i in _pack_ary){
					if(_pack_ary[i][0] == start || _pack_ary[i][1] == start){
						_str = target + '=' + _pack_ary[i][0] + '+' + _pack_ary[i][1];
						console.log(_str);
						$('#devilLineshow').html(_str);
						return;
					}
					_ary.push(_pack_ary[i]);
					_str = '';
				}
			}else{
				_str = _str + index + ':';
				for(var a in _ary){
					for(var b in _ary[a]){
						console.log(b);
						_pack_ary = devilCombin(_ary[a][b]);
						var _new_ary = [];
						_str = _str + _ary[a][0] + '+' + _ary[a][1] + '|';
						for(var i in _pack_ary){
							if(_pack_ary[i][0] == start || _pack_ary[i][1] == start){
								console.log(_str);
								console.log(_ary[a][b] + '=' + _pack_ary[i][0] + '+' + _pack_ary[i][1]);
								$('#devilLineshow').html(_str);
								return;
							}
							_new_ary.push(_pack_ary[i]);
						}
						
						_ary = _new_ary;
					}
				}
			}
			index ++;
		}
	}


	// Object Type: Devil Info
	// Struct: Name - String
    //         Race - String
	//         Grade - Integer

	// Button: 二身合體
	function btn_DevilFusion() {
		var seldevil1 = $('select[id="selDevil1"]').val();
		var seldevil2 = $('select[id="selDevil2"]').val();
		var _str = "";
		if (seldevil1 == "default" | seldevil2 == "default") {	// Unselect
			_str = "請選擇仲魔";
		} else {
			
			var result = DevilFusion(seldevil1, seldevil2);	// Fusion
			if (result == null) {	// No fusion result
				_str = "無法合體";
			} else {
				_str = result.Race + "　" + result.Name + "\t　階級：" + result.Grade;
			}
		}
		$('#txtFusionResult').html(_str);
	}

	// 二身合體 Devil Fusion
	//   name1 - 素材1名稱 - String
	//   name2 - 素材2名稱 - String
	function DevilFusion(name1, name2) {
		var i
		var result;
		var devil1 = {Name:name1, Race:allDevil[name1][2], Grade:parseInt(allDevil[name1][1])};
		var devil2 = {Name:name2, Race:allDevil[name2][2], Grade:parseInt(allDevil[name2][1])};
		
		var tarName = "";
		var tarRace = "";
		var tarGrade = (devil1.Grade + devil2.Grade) / 2.0 + 1;	// Compute the result grade

		var idx_result = 0;
		var flg_finddevil = false;
		
		// Find the result race
		for (i in twoDevil[devil1.Race]) {
			if (twoDevil[devil1.Race][i][0] == devil2.Race) {
				tarRace = twoDevil[devil1.Race][i][1];
				break;
			}
		}
		
		if (tarRace == "" | tarRace == "-") {	// Cannot fuse
			return null
		}
		
		// Find upper bound of result grade
		for (i = RankAllDevil.length - 1; i >= 0; i--) {	// Upward from grade 1
			if (allDevil[RankAllDevil[i][0]][2] == tarRace) {
				if (allDevil[RankAllDevil[i][0]][1] >= tarGrade) {
					idx_result = i;
					flg_finddevil = true;
					break;
				}
			}
		}
		
		if (!flg_finddevil) {	// No upper bound, must be the highest grade devil of the race
			// find highest grade
			for (i = 0; i < RankAllDevil.length; i++) {	// Downward from grade 99
				if (allDevil[RankAllDevil[i][0]][2] == tarRace) {	// Match the race
					idx_result = i;
					break;
				}
			}
		}
		result = {Name:RankAllDevil[idx_result][0], Race:tarRace, Grade:parseInt(allDevil[RankAllDevil[idx_result][0]][1])};
		return result;
	}
	
	// 合體路徑規劃
	function FusionPath(source, target) {
		var src_devil = {Name:source, Race:allDevil[source][2], Grade:parseInt(allDevil[source][1])};
		var tar_devil = {Name:target, Race:allDevil[target][2], Grade:parseInt(allDevil[target][1])};
	}

	function TestFunc() {
		var devil1 = {Name:"阿斯萊爾", Race:"大天使", Grade:67};
		var devil2 = {Name:"奧丁", Race:"魔神", Grade:73};
		var result = DevilFusion("阿斯萊爾", "奧丁");
		console.log(result);
	}
	
