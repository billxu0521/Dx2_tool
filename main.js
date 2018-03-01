
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
		_targetdevil_ary = RankAllDevil.slice(0);
		_targetdevil_ary = _targetdevil_ary.sort(function (a, b) {
					return a[1] - b[1];
				});
		//console.log(_targetdevil_ary[0]);

		//從全部惡魔找出合成目標前一個惡魔
        for(var i in _targetdevil_ary){
        	//console.log(_targetdevil_ary[i][0] + ':' + _targetdevil_ary[i][1]);
			if(allDevil[targetDevil][2] == allDevil[_targetdevil_ary[i][0]][2] &&  allDevil[_targetdevil_ary[i][0]][1] < parseInt(allDevil[targetDevil][1])){
				_before_devil = _targetdevil_ary[i][0];
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
		//console.log(_before_devil+ ':' + allDevil[_before_devil][1]);
		
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
					
					var grade = ((parseInt(_targetdevil_ary[i][1]) + parseInt(_targetdevil_ary[j][1]))/2) + 0.5;
					//console.log(_targetdevil_ary[i][0] + '+' + _targetdevil_ary[j][0] + ':' + (((parseInt(_targetdevil_ary[i][1]) + parseInt(_targetdevil_ary[j][1]))/2) + 1)  + '=>' +targetDevil + ':' + allDevil[targetDevil][1] + '/' + _before_devil + ':' +allDevil[_before_devil][1]);
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

    /**
     * 惡魔合成素材查詢、去除重複及過濾條件，並依素材等級平均&差距排序
     * @param {String} target 合體惡魔名稱
     * @param {Integer} condition 搜尋條件，預設2
     *                            0: 使用的素材無任何限制
     *                            1: 合體素材階級需低於目標惡魔
     *                            2: 合體素材星數需低於目標惡魔
     *                            其它condition值等同0之結果
     * @returns {Matrix} 惡魔組合 size = n x 2
     *                   Array[n]: 第n種組合
     *                   Array[n] = [素材惡魔名稱1, 素材惡魔名稱2]
     */
    function devilCombin_Filter(target, condition=2) {
            var _ary = devilCombin(target);
            var condi_rank = 1;	// if filter by rarity, then 20
            var condi_less = 0; // if condition is less than, then 1;
            var _tar_grade = parseInt(allDevil[target][1]);
            var _src_grade1 = 0;
            var _src_grade2 = 0;
            for(var x in _ary){
                    //檢查有無重複
                    var _first_devil = _ary[x][0]; //第一隻
                    var _second_devil = _ary[x][1]; //第二隻
                    for(var y in _ary){
                            if(_first_devil == _ary[y][1] && _second_devil == _ary[y][0]){
                                    _ary.splice(y, 1);
                            } 
                    }
            }

            switch (condition) {
                    case 1:
                            condi_less = 1;
                            break;
                    case 2:
                            condi_rank = 20
                            condi_less = 1;
                            break;
                    default:;
            }
            //console.log(_ary);
            for(var i = 0; i < _ary.length; i++) {
                    _src_grade1 = parseInt(allDevil[_ary[i][0]][1]);
                    _src_grade2 = parseInt(allDevil[_ary[i][1]][1]);
                    if ((Math.floor(_tar_grade/condi_rank) - Math.floor(_src_grade1/condi_rank) - 1)*condi_less < 0 || (Math.floor(_tar_grade/condi_rank) - Math.floor(_src_grade2/condi_rank) - 1)*condi_less < 0) {	// use lv-1 to exclude the euqal stats
                            _ary.splice(i, 1);
                            i--;
                    }
            }
            _ary.sort(function(a, b) { 
                    var a_Grade1 = parseInt(allDevil[a[0]][1]);
                    var a_Grade2 = parseInt(allDevil[a[1]][1]);
                    var b_Grade1 = parseInt(allDevil[b[0]][1]);
                    var b_Grade2 = parseInt(allDevil[b[1]][1]);
                    if (a_Grade1 + a_Grade2 == b_Grade1 + b_Grade2) {
                            return (b_Grade1 - b_Grade2) - (a_Grade1 - a_Grade2);
                    } else {
                            return (a_Grade1 + a_Grade2) - (b_Grade1 + b_Grade2);
                    }
            });

            return _ary;
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

    

    

    /**
     * 二身合體 Devil Fusion
     * @param {String} name1 素材1名稱
     * @param {String} name2 素材2名稱
     * @returns {String} 合體惡魔名稱
     */ 
    function devilFusion(name1, name2) {
            var i
            var _result;
            var _devil1 = {Name:name1, Race:allDevil[name1][2], Grade:parseInt(allDevil[name1][1])};
            var _devil2 = {Name:name2, Race:allDevil[name2][2], Grade:parseInt(allDevil[name2][1])};

            var _tar_race = "";
            var _tar_grade = (_devil1.Grade + _devil2.Grade) / 2.0 + 0.5;	// Compute the result grade


            var _idx_result = 0;
            var _flg_find_devil = false;

            // Find the result race
            for (i in twoDevil[_devil1.Race]) {
                    if (twoDevil[_devil1.Race][i][0] == _devil2.Race) {
                            _tar_race = twoDevil[_devil1.Race][i][1];
                            break;
                    }
            }

            if (_tar_race == "" || _tar_race == "-") {	// Cannot fuse
                    return null
            }

            // Find upper bound of result grade
            for (i = RankAllDevil.length - 1; i >= 0; i--) {	// Upward from grade 1
                    if (allDevil[RankAllDevil[i][0]][2] == _tar_race) {
                            if (allDevil[RankAllDevil[i][0]][1] >= _tar_grade) {
                                    _idx_result = i;
                                    _flg_find_devil = true;
                                    break;
                            }
                    }
            }

            if (!_flg_find_devil) {	// No upper bound, must be the highest grade devil of the race
                    // find highest grade
                    for (i = 0; i < RankAllDevil.length; i++) {	// Downward from grade 99
                            if (allDevil[RankAllDevil[i][0]][2] == _tar_race) {	// Match the race
                                    _idx_result = i;
                                    break;
                            }
                    }
            }
            _result = {Name:RankAllDevil[_idx_result][0], Race:_tar_race, Grade:parseInt(allDevil[RankAllDevil[_idx_result][0]][1])};
            console.log(_tar_grade);
            console.log(_result);

            return _result;
    }

    
    /** 
     * 逆二身合體 Inversed Devil Fusion with Condition
     * @param {String} target 目標合體仲魔名稱
     * @param {String} source 合體用素材仲魔名稱
     * @param {Integer} condition 合體素材尋找條件限制
     *                            0: 列出各種族最低等素材
     *                            1: 各種族最低等素材結果中，選出最低階種族的惡魔，若兩惡魔同階級，只會列出其中一種
     *                            2: 各種族最低等素材結果中，選出最高階種族的惡魔，若兩惡魔同階級，只會列出其中一種
     *                            3: 各種族最低等素材結果中，選出最低階種族的惡魔，且低於惡魔階級，若兩惡魔同階級，只會列出其中一種
     *                            4: 各種族最低等素材結果中，選出最高階種族的惡魔，且低於惡魔階級，若兩惡魔同階級，只會列出其中一種
     *                            5: 各種族最低等素材結果中，選出最低階種族的惡魔，且低於惡魔星數，若兩惡魔同階級，只會列出其中一種
     *                            6: 各種族最低等素材結果中，選出最高階種族的惡魔，且低於惡魔星數，若兩惡魔同階級，只會列出其中一種
     * @returns {String} 最滿足條件仲魔名稱
     *                   null: 無滿足條件之仲魔
     */            
    function invDevilFusionCondition (target, source, condition=0) {
            var _MAX_GRADE = 99;

            var _src_race = allDevil[source][2];
            var _src_grade = allDevil[source][1];
            var _tar_race = allDevil[target][2];
            var _tar_grade = allDevil[target][1];
            var _upper_grade = _tar_grade + 0.5;
            var _lower_grade = 0;
            var _idx_target = 0;
            var _idx_start = 0;
            var _idx_end = RankAllDevil.length - 1;
            var _flg_higher_devil_exist = false;
            var _candidate_list = [];
            var i, j;

            // Find grade lower bound
            for (i=0;i<RankAllDevil.length;i++) {
                    if (RankAllDevil[i][0] == target) {
                            _idx_target = i;
                            break;
                    }
            }

            for (i=_idx_target+1;i<RankAllDevil.length;i++) {
                    if (allDevil[RankAllDevil[i][0]][2] == _tar_race) {
                            _lower_grade = parseInt(allDevil[RankAllDevil[i][0]][1]) + 0.5;
                            break;
                    }
            }

            // Compute the range of grade.
            _lower_grade = (_lower_grade-1) * 2 - _src_grade;

            // Check the upper bound (if there is no higher grade of devil)
            for (i=_idx_target-1;i>=0;i++) {
                    if (allDevil[RankAllDevil[i][0]][2] == _tar_race) {
                            _flg_higher_devil_exist = true;
                            break
                    }
            }
            if (_flg_higher_devil_exist) {
                    _upper_grade = (_upper_grade-1) * 2 - _src_grade;
            } else {
                    _upper_grade = _MAX_GRADE;
            }

            // Setup possible index range. The range must satisfy: _upper_grade >= Grade > _lower_grade
            for (i=0;i<RankAllDevil.length;i++) {
                    if (RankAllDevil[i][1] <= _upper_grade) {
                            _idx_end = i;
                            break;
                    }
            }

            for (i=RankAllDevil.length-1;i>=0;i--) {
                    if (RankAllDevil[i][1] > _lower_grade) {
                            _idx_start = i;
                            break;
                    }
            }

            // Find the possible race
            for (i=0;i<twoDevil[_src_race].length;i++) {
                    if (twoDevil[_src_race][i][1] == _tar_race) {
                            _candidate_list.push({Name:"", Race:twoDevil[_src_race][i][0], Grade:0});
                    }
            }

            // Find the devil of lowest grade in each race
            for (i=0;i<_candidate_list.length;i++) {
                    for (j=_idx_start;j>=_idx_end;j--) {
                            if (allDevil[RankAllDevil[j][0]][2] == _candidate_list[i].Race) {
                                    _candidate_list[i].Name = RankAllDevil[j][0];
                                    _candidate_list[i].Grade = parseInt(RankAllDevil[j][1]);
                                    break;
                            }
                    }
            }

            // Remove the impossible race combinations
            for (i=0;i<_candidate_list.length;i++) {
                    if (_candidate_list[i].Grade == 0) {
                            _candidate_list.splice(i, 1);
                            i--;
                    }
            }

            // Sort the list based on grades
            _candidate_list.sort(function(a, b) {
                    return a.Grade - b.Grade;
            });

            switch (condition) {
                    case 0:
                            return _candidate_list;
                    case 1:
                            return [_candidate_list[0]];
                    case 2:
                            return [_candidate_list[_candidate_list.length-1]];
                    case 3:
                            for (i=0;i<_candidate_list.length;i++) {
                                    if (_candidate_list[i].Grade >= _tar_grade) {
                                            _candidate_list.splice(i, 1);
                                            i--;
                                    }
                            }
                            return [_candidate_list[0]];
                    case 4:
                            for (i=0;i<_candidate_list.length;i++) {
                                    if (_candidate_list[i].Grade >= _tar_grade) {
                                            _candidate_list.splice(i, 1);
                                            i--;
                                    }
                            }
                            return [_candidate_list[_candidate_list.length-1]];
                    case 5:
                            for (i=0;i<_candidate_list.length;i++) {
                                    if (Math.floor(_candidate_list[i].Grade/20) >= Math.floor(_tar_grade/20)) {
                                            _candidate_list.splice(i, 1);
                                            i--;
                                    }
                            }
                            return [_candidate_list[_candidate_list.length-1]];
                    case 6:
                            for (i=0;i<_candidate_list.length;i++) {
                                    if (Math.floor(_candidate_list[i].Grade/20) >= Math.floor(_tar_grade/20)) {
                                            _candidate_list.splice(i, 1);
                                            i--;
                                    }
                            }
                            return [_candidate_list[_candidate_list.length-1]];
                    default:
                            return null;
            }
    }

    

    /**
     * 合體路徑規劃
     * @param {String} source 素材惡魔名稱
     * @param {String} target 合體惡魔名稱
     * @param {Integer} condition 搜尋條件，對應InvDevilFusion_condi參數，預設5
     *                            0, 2, 4, 6: 在此函式中禁用
     *                            1: 使用的素材無任何限制
     *                            3: 使用的素材需造成升階/平階合體 (合成後惡魔不在此限)
     *                            5: 使用的素材需造成升階合體 (合成後惡魔不在此限)
     * @returns {Array} length = 2
     *                  Array[0]: 主要惡魔合體線
     *                  Array[1]: 額外準備素材
     */
    function fusionPath(source, target, condition=5) {
            var _src_devil = {Name:source, Race:allDevil[source][2], Grade:parseInt(allDevil[source][1])};
            var _tar_devil = {Name:target, Race:allDevil[target][2], Grade:parseInt(allDevil[target][1])};
            var _req_devil = null;

            var _candidate_queue = [];	// rule: FILO
            var _path_stack = [];		// rule: FILO
            var _pair_devil_list = [];
            var _candidate_devil = null;
            var _new_candidate_list = [];

            var _race_list = [];
            var _devil_number_list = [];
            var _devil_history_list = [];	// prevent re-search the same devil

            var i;
            var j;

            _candidate_queue.push(_src_devil);
            _devil_number_list.push(1);
            _devil_history_list.push(_src_devil.Name);	// add to history

            while (_candidate_queue.length > 0) {
                    _candidate_devil = _candidate_queue.pop();
                    _path_stack.push(_candidate_devil);
//			console.log(candidateDevil);
                    _req_devil = (invDevilFusionCondition(_tar_devil.Name, _candidate_devil.Name, condition))[0];
                    _race_list = [];
                    _new_candidate_list = [];

                    if (_req_devil == null) {	// Cannot fuse, find alternative solutions
                            // search the best upgraded path
                            // find the possible fused races
                            _race_list = [];
                            for (i=0;i<twoDevil[_candidate_devil.Race].length;i++) {
                                    if (twoDevil[_candidate_devil.Race][i][1] == "" || twoDevil[_candidate_devil.Race][i][1] == "-") {
                                            continue;
                                    }
                                    if (_race_list.indexOf(twoDevil[_candidate_devil.Race][i][1]) == -1) {
                                            _race_list.push(twoDevil[_candidate_devil.Race][i][1]);
                                    }
                            }

                            // find the closest upgrade for each possible race
                            for (i=0;i<_race_list.length;i++) {
                                    // 有可能 A+B 無法產出C，因此需用invDevilFusionCondition檢查
                                    for (j=RankAllDevil.length-1;j>=0;j--) {
                                            if (allDevil[RankAllDevil[j][0]][2] == _race_list[i] && RankAllDevil[j][1] > _candidate_devil.Grade && RankAllDevil[j][1] <= _tar_devil.Grade) {
                                                    if (_devil_history_list.indexOf(RankAllDevil[j][0]) == -1) {	// Material not existed in the history list
                                                            _req_devil = (invDevilFusionCondition(RankAllDevil[j][0], _candidate_devil.Name, condition))[0];
                                                            if (_req_devil != null) {
                                                                    _new_candidate_list.push({Name:RankAllDevil[j][0], Race:allDevil[RankAllDevil[j][0]][2], Grade:RankAllDevil[j][1]});
                                                                    _devil_history_list.push(RankAllDevil[j][0]);	// Add material to history list
                                                                    break;
                                                            }
                                                    }
                                            }
                                    }
                            }
                            _new_candidate_list.sort(function(a, b) {
                                    return a.Grade - b.Grade;
                            });

                            for (i=0;i<_new_candidate_list.length;i++) {
                                    _candidate_queue.push(_new_candidate_list[i]);
                            }
                            _devil_number_list.push(_new_candidate_list.length);
                            while (_devil_number_list[_devil_number_list.length-1] == 0) {
                                    _devil_number_list.pop();
                                    _path_stack.pop();
                                    _devil_number_list[_devil_number_list.length-1] -= 1;
                            }
//				console.log(devil_number_list);
                    } else {
                            break;
                    }
            }
            if (_path_stack.length > 0) {
                    _path_stack.push(_tar_devil);
                    for (i=0;i<_path_stack.length-1;i++) {
                            _req_devil = (invDevilFusionCondition(_path_stack[i+1].Name, _path_stack[i].Name, condition))[0];
                            _pair_devil_list.push(_req_devil);
                    }
                    return [_path_stack, _pair_devil_list];
//			console.log(path_stack);
//			console.log(pair_devil_list);
            } else {
                    return null;
            }
    }

    /**
     * 惡魔合成樹
     * @param {String} target 合體惡魔名稱 
     * @param {Associative String Array} material_list 允許使用素材惡魔
     *                                                key: 惡魔名稱
     *                                                Array[key][0]: 合體[key]惡魔所使用惡魔1名稱
     *                                                Array[key][1]: 合體[key]惡魔所使用惡魔2名稱
     * @param {String Array} useless_devil_list 無法用於合體的惡魔名稱，初始為[]
     * @param {Integer} condition 搜尋條件，預設2
     *                        0: 使用的素材無任何限制
     *                        1: 合體素材階級需低於目標惡魔
     *                        2: 合體素材星數需低於目標惡魔
     * @returns {Associative String Array} 允許使用素材惡魔 (同material_list)
     */
    function fusionTree(target, material_list, condition = 2) {
            var _stack = [];
            var _devil_pair = [];
            var _search_history = [];	// used to prevent the duplicated search. record the history when the devil name push into _stack
            var _flg_find = false;
            var _flg_delay = false;
            var _buffer_devil;
            var _buffer_table = [];
            var useless_devil_list = [];

            if (material_list.hasOwnProperty(target)) {
                    return material_list;
            }
            var _new_fusion_table = devilCombin_Filter(target, condition);

            if (_new_fusion_table.length > 0) {
                    _stack.push({name:target, fusion_table:_new_fusion_table, check:0});
                    _search_history.push(target);
            }


            while (_stack.length > 0) {
                    // before the iteration start, check if there is material pair or not to improve the result
                    _flg_find = false;
                    for (var x in _stack[_stack.length-1].fusion_table) {
                            _devil_pair = _stack[_stack.length-1].fusion_table[x];
                            if (material_list.hasOwnProperty(_devil_pair[0]) && material_list.hasOwnProperty(_devil_pair[1])) {
                                    material_list[_stack[_stack.length-1].name] = [_devil_pair[0], _devil_pair[1]];
                                    _flg_find = true;
                                    break;
                            }
                    }

                    if (_flg_find) {
                            _stack.pop();
                            continue;
                    }


                    _devil_pair = _stack[_stack.length-1].fusion_table[0];
                    //console.log(_devil_pair);
                    // Check if the pair need to be searched
                    if (useless_devil_list.indexOf(_devil_pair[0]) == -1 && useless_devil_list.indexOf(_devil_pair[1]) == -1) {	// not useless devils
                            _flg_delay = false;
                            if (!material_list.hasOwnProperty(_devil_pair[0]) && _search_history.indexOf(_devil_pair[0]) == -1) {	// haven't searched
                                    _new_fusion_table = devilCombin_Filter(_devil_pair[0], condition);
                                    if (_new_fusion_table.length > 0) {
                                            _stack.push({name:_devil_pair[0], fusion_table:_new_fusion_table});
                                            _search_history.push(_devil_pair[0]);
                                    } else {	// cannot fused
                                            useless_devil_list.push(_devil_pair[0]);
                                    }
                            } else {	// don't know useful or not, delay the search
                                    _flg_delay = true;
                            }
                            if (!material_list.hasOwnProperty(_devil_pair[1]) && _search_history.indexOf(_devil_pair[1]) == -1) {	// haven't searched
                                    _new_fusion_table = devilCombin_Filter(_devil_pair[1], condition);
                                    if (_new_fusion_table.length > 0) {
                                            _stack.push({name:_devil_pair[1], fusion_table:_new_fusion_table});
                                            _search_history.push(_devil_pair[1]);
                                    } else {	// cannot fused
                                            useless_devil_list.push(_devil_pair[1]);
                                    }
                            } else {	// don't know useful or not, delay the search
                                    _flg_delay = true;
                            }
                            if (_flg_delay) {	// put the pair to the last of table
                                    _buffer_devil = _stack[_stack.length-1].fusion_table.shift();
                                    _stack[_stack.length-1].fusion_table.push(_buffer_devil);
                                    _stack[_stack.length-1].check++;
                            }
                    } else {	// no need to search the pair, check if devil is useless
                            _stack[_stack.length-1].fusion_table.shift();
                            if (_stack[_stack.length-1].fusion_table.length == 0) {
                                    useless_devil_list.push(_stack[_stack.length-1].name);
                                    _stack.pop();
                            } else if (_stack[_stack.length-1].fusion_table.length == _stack[_stack.length-1].check) {	// table need to be delay
                                    _buffer_table = _stack.pop();
                                    _buffer_table.check = 0;
                                    _stack.unshift(_buffer_table);
                            }
                    }
            }

            //console.log(material_list);
    /* 遞迴寫法
            if (material_list.hasOwnProperty(target)) {	// Can be fused by materials
                    return true;
            } else if (useless_devil_list.indexOf(target) != -1) {	// already searched
                    return false;
            } else {	// Never searched
                    var candidateList = devilCombin_Filter(target, condition);
                    for (var i = 0; i< candidateList.length; i++) {
                            if (FusionTree(candidateList[i][0], material_list, condition, useless_devil_list)&&FusionTree(candidateList[i][1], material_list, condition, useless_devil_list)) {	// Can be fused
                                    material_list[target] = [candidateList[i][0], candidateList[i][1]];
                                    return true;
                            } else {
                                    useless_devil_list.push(target);
                            }
                    }
                    return false;
            }
    */
    }


    /**
     * 瀏覽顯示合成樹各節點 (FIFO)
     * @param {String} target 合體目標(root node)
     * @param {Associative String Array} tree 惡魔合成樹
     * @returns {String} 合成樹各節點結構
     */
    function travelTree(target, tree) {
            var _traveler = null;	// travel node
            var _queue = [];	// FIFO
            var _str = "";

            if (!tree.hasOwnProperty(target)) {                
                _str = "無法用選取素材合成惡魔";
                console.log("無法用選取素材合成惡魔");
                return _str;
            }

            _queue.push(target);

            while (_queue.length > 0) {
                    _traveler = _queue.shift();
                    if (tree[_traveler] != null) {
                            _str += _traveler + " = " + tree[_traveler][0] + " + " + tree[_traveler][1] + "<br>";
                            console.log(_traveler + " = " + tree[_traveler][0] + " + " + tree[_traveler][1]);
                            _queue.push(tree[_traveler][0]);
                            _queue.push(tree[_traveler][1]);
                    }
            }
            return _str;
    }

    function TestFunc() {
            var selSourceDevil = "美人魚";
            var selTargetDevil = "薩麥爾";
            var result = [];

            if (selSourceDevil == "default" || selTargetDevil == "default") {	// Unselect
                    _str = "請選擇仲魔";
                    console.log("請選擇仲魔");
            } else {
                    var material = [];
                    material["哈索爾"] = null;
                    material["弗莫爾"] = null;
                    material["能天使"] = null;
                    material["塔姆林"] = null;
                    material["海奎特"] = null;
                    material["增長天"] = null;
                    material["美人魚"] = null;
                    material["巴風特"] = null;
                    material["佛鈕司"] = null;
                    fusionTree(selTargetDevil, material, 1);
                    console.log(selTargetDevil);
                    console.log(material);
                    travelTree(selTargetDevil, material);

            }
            //console.log(result);
            //$('#devilCombinshow').html(_str);

    }
