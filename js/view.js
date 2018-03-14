/**
     * Button: 合體路徑查詢
     */ 
    function btnPathFusionQuery() {
            var _sel_source_devil = $('select[id="selPathSource"]').val();
            var _sel_target_devil = $('select[id="selPathTarget"]').val();
            var _sel_condition = parseInt($('select[id="selPathCondition"]').val());
            var _result = [];
            var _result2 = [];
            var _str = "";
            var i;

            if (_sel_source_devil == "default" || _sel_target_devil == "default") { // Unselect
                    _str = "請選擇仲魔";
            } else {
                    _result = fusionPath(_sel_source_devil, _sel_target_devil, _sel_condition);
                    _result2 = traversalPath(_result);
                    console.log(_result2);
                    if (_result != null) {
                            _str = "<Table>\n";
                            _str += "<TBody align=\"center\">\n";
                            _str += "\t<tr>\n";

                            _str +="\t\t<td>" + _result[0][0].Race + "</td>\n";
                            for (i=1;i<_result[0].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>" + _result[0][i].Race + "</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td>" + _result[0][0].Name + "</td>\n";
                            for (i=1;i<_result[0].length;i++) {
                                    _str +="\t\t<td>→</td>\n";
                                    _str +="\t\t<td>" + _result[0][i].Name + "</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td>Grade: " + _result[0][0].Grade + "</td>\n";
                            for (i=1;i<_result[0].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>Grade: " + _result[0][i].Grade + "</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td></td>\n";
                            for (i=0;i<_result[1].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>↑</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td></td>\n";
                            for (i=0;i<_result[1].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>" + _result[1][i].Race + "</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td></td>\n";
                            for (i=0;i<_result[1].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>" + _result[1][i].Name + "</td>\n";
                            }

                            _str += "\t</tr>\n<tr>\n";

                            _str +="\t\t<td></td>\n";
                            for (i=0;i<_result[1].length;i++) {
                                    _str +="\t\t<td></td>\n";
                                    _str +="\t\t<td>Grade: " + _result[1][i].Grade + "</td>\n";
                            }


                            _str += "</tr>\n</TBody></Table>\n";
                    } else {
                            _str = "無符合條件之組合，請選擇其他條件";
                    }
            }


            $('#txtPathFusionResult').html(_str);
    }

    /**
     * Button: 逆二身合體
     */ 
    function btnInversedFusionQuery() {
            var _sel_target = $('select[id="selInvTarget"]').val();
            var _sel_source = $('select[id="selInvSource"]').val();
            var _sel_condition = parseInt($('#content5 select[id="selInvCondition"]').val());
            var _result = [];
            var _str = "";
            var i;

            if (_sel_target == "default" || _sel_source == "default") { // Unselect
                    _str = "請選擇仲魔";
            } else {
                    _result = invDevilFusionCondition(_sel_target, _sel_source, _sel_condition);
                    if (_result.length == 0 || _result[0] == null) {
                            _str = "無法合體為目標惡魔"
                    } else {
                            switch (_sel_condition) {
                                    case 0: // List
                                            for (i=0;i<_result.length;i++) {
                                                    _str += _result[i].Race + "　" + _result[i].Name + "\t　階級：" + _result[i].Grade + "<br>";
                                            }
                                            break;
                                    case 1: // Lowest Grade
                                    case 2: // Highest Grade
                                            _str = _result[0].Race + "　" + _result[0].Name + "\t　階級：" + _result[0].Grade;
                                            break;
                                    default:;
                            }
                    }
            }
            $('#txtInvFusionResult').html(_str);

    }

    /**
     * Button: 二身合體
     */ 
    function btnDevilFusion() {
            var _sel_devil1 = $('select[id="selDevil1"]').val();
            var _sel_devil2 = $('select[id="selDevil2"]').val();
            var _str = "";
            if (_sel_devil1 == "default" || _sel_devil2 == "default") { // Unselect
                    _str = "請選擇仲魔";
            } else {

                    var result = devilFusion(_sel_devil1, _sel_devil2); // Fusion
                    if (result == null) {   // No fusion result
                            _str = "無法合體";
                    } else {
                            _str = result.Race + "　" + result.Name + "\t　階級：" + result.Grade;
                    }
            }
            $('#txtFusionResult').html(_str);
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

    //區塊顯示所有仲魔
    function showDevilListArea(){
        var _obj= allDevil;
        //console.log(_obj);  
        var $cSel = $('#devilalllist'); 
        $cSel.append($("<div class='ranktitle' onclick=\"divShowSwitch(this);\">1星<a class='titleswitch'>+</div></div><div id='rank1devil'></div>"));
        $cSel.append($("<div class='ranktitle' onclick=\"divShowSwitch(this);\">2星<a class='titleswitch'>+</div></div><div id='rank2devil'></div>"));
        $cSel.append($("<div class='ranktitle' onclick=\"divShowSwitch(this);\">3星<a class='titleswitch'>+</div></div><div id='rank3devil'></div>"));
        $cSel.append($("<div class='ranktitle' onclick=\"divShowSwitch(this);\">4星<a class='titleswitch'>+</div></div><div id='rank4devil'></div>"));
        $cSel.append($("<div class='ranktitle' onclick=\"divShowSwitch(this);\">5星<a class='titleswitch'>+</div></div><div id='rank5devil'></div>"));
        for(var x in _obj){
            if(_obj[x][0] == '1'){
                $("#rank1devil").append($("<div style='display:inline-block'><input type='checkbox' class='devilcheck' id='" + x + "' value='" + x + "'>" + x + "</div>"));
            }else if(_obj[x][0] == '2'){
                $("#rank2devil").append($("<div style='display:inline-block'><input type='checkbox' class='devilcheck' id='" + x + "' value='" + x + "'>" + x + "</div>"));
            }else if(_obj[x][0] == '3'){
                $("#rank3devil").append($("<div style='display:inline-block'><input type='checkbox' class='devilcheck' id='" + x + "' value='" + x + "'>" + x + "</div>"));
            }else if(_obj[x][0] == '4'){
                $("#rank4devil").append($("<div style='display:inline-block'><input type='checkbox' class='devilcheck' id='" + x + "' value='" + x + "'>" + x + "</div>"));
            }else if(_obj[x][0] == '5'){
                $("#rank5devil").append($("<div style='display:inline-block'><input type='checkbox' class='devilcheck' id='" + x + "' value='" + x + "'>" + x + "</div>"));
            }
        }

    }

    //檢索路徑
    function setPathTree(){
        var _trgdevil = $('#selPathTarget').val();
        var _cond = $('#content6 #selInvCondition').val();
        var _devil_ary = [];
        var _sele = $('#devilalllist input:checked');
        _sele.each(function( index ) {
            console.log(_sele.val());
            _devil_ary.push($( this ).val());
        });
        showPathTree(_trgdevil , _devil_ary , _cond);
    }


//繪製路徑
function showPathTree(trgdevil,devilary,cond){
    // Example code for fusion tree
    var _selTargetDevil = trgdevil;
    var _result = [];
    if (_selTargetDevil == "default") { // Unselect
        // error msg: no devil selected
    } else {
        var _materials = devilary;    // UI needed. Pack from selected check boxes
        var _material_list = createMaterialList(_materials);
        var _material_count = _materials.length;
        console.log(trgdevil);
        console.log(_materials);
        console.log(_material_count);
        _result = traversalTree(_selTargetDevil, fusionTree(_selTargetDevil, _material_list, cond))
        console.log(_result);
        if (_result != null) {
            // cytoscape declairation w/o drawing
            var nodeTest = window.nodeTest = cytoscape({
                //在這個元素中繪製
                container: document.getElementById('shownode'),

                boxSelectionEnabled: false,
                autounselectify: true,

                
                layout: {
                    name: 'grid'
                },
                //這邊宣告繪製方式
                style: [
                {
                  selector: 'node',
                  style: {
                    'content': 'data(id)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': '#11479e'
                  }
                },

                {
                  selector: 'edge',
                  style: {
                    'curve-style': 'bezier',
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea'
                  }
                }
                ]
            });
            
            // Draw Node
            for (i=0;i<_result[0].length;i++) {
                _str = "Devil " + i + " " + _result[0][i].Devil.Name;
                nodeTest.add([
                    {elements:"nodes", data: {id: _str}}
                ]);
            }
            
            // Draw Edge
            for (i=0;i<_result[0].length;i++) {
                if (_result[0][i].Parent != -1) {
                    _str_src = "Devil " + _result[0][i].Parent + " " + _result[0][_result[0][i].Parent].Devil.Name;
                    _str_tar = "Devil " + i + " " + _result[0][i].Devil.Name;
                    nodeTest.add([
                        {elements:"edges", data: {source:_str_src, target: _str_tar}}
                    ]);
                    

                }
            }
            //重新設定輸出排列
            var layout = nodeTest.layout({
              //層級式排列
              name: 'dagre'
            });
            console.log('run');
            layout.run(); 
                    
        } else {
            $('#shownode').html('沒有結果');
        }
    }
    //*/
}

function selectIngredient(select)
{
    var _sel_target_devil = $(select).val();
    var $ul = $(select).prev('ul');
    if ($ul.find('input[value=' + $(select).val() + ']').length == 0)
    $ul.append('<li onclick="$(this).remove();">' +
    '<input type="hidden" class="materialDevil" value="' + 
    _sel_target_devil + '" /> ' +
    _sel_target_devil + '</li>');
}

//惡魔列表區塊隱藏開關
function divShowSwitch(select){
    if($(select).next().is(':visible')){
        $(select).next().hide();
        $(select).children().text('-');
      }else{
        $(select).next().show();
        $(select).children().text('+');
      }
    }

//之後拿掉
//繪製測試路徑
function nodeTest(){
    /*
    //宣告這個外掛的物件cytoscape
    var nodeTest = window.nodeTest = cytoscape({
        //在這個元素中繪製
      container: document.getElementById('nodeTest'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },
      //這邊宣告繪製方式
      style: [
        {
          selector: 'node',
          style: {
            'content': 'data(id)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#11479e'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea'
          }
        }
      ],

      //宣告繪製節點
      elements: {
        nodes: [
          { data: { id: 'n0' } },
          { data: { id: 'n1' } },
          { data: { id: 'n2' } }
          
        ],
        edges: [
          { data: { source: 'n0', target: 'n1' } },
          { data: { source: 'n1', target: 'n2' } }
          
        ]
      },
    });

    
    //動態增加節點繪製
    for (var i=2; i<10; i++) {
        nodeTest.add([
            {elements:"nodes", data: {id: 'n'+i}},
            {elements:"edges", data: {source:'n'+i, target: 'n1' }}
        ])
    }
    */
   	
    /*
    // Example code for fusion path
    var _sel_source_devil = $('select[id="selPathSource"]').val();
    var _sel_target_devil = $('select[id="selPathTarget"]').val();
    var _sel_condition = parseInt($('select[id="selPathCondition"]').val());
    var _result = [];
    var _str = "";
    var i;
    var _str = "";
    var _str_src = "";
    var _str_tar = "";

    if (_sel_source_devil == "default" || _sel_target_devil == "default") { // Unselect
        // error msg: no devil selected
        // _str = "請選擇仲魔";
    } else {
        _result = traversalPath(fusionPath(_sel_source_devil, _sel_target_devil, _sel_condition));
        if (_result != null) {      
            // cytoscape declairation w/o drawing
            var nodeTest = window.nodeTest = cytoscape({
                //在這個元素中繪製
                container: document.getElementById('nodeTest'),

                boxSelectionEnabled: false,
                autounselectify: true,

                layout: {
                    name: 'dagre'
                },
                //這邊宣告繪製方式
                style: [
                {
                  selector: 'node',
                  style: {
                    'content': 'data(id)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': '#11479e'
                  }
                },

                {
                  selector: 'edge',
                  style: {
                    'curve-style': 'bezier',
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea'
                  }
                }
                ]
            });
            
            // Draw Node
            for (i=0;i<_result[0].length;i++) {
                _str = "Devil " + i + " " + _result[0][i].Devil.Name;
                nodeTest.add([
                    {elements:"nodes", data: {id: _str}}
                ]);
            }
            
            // Draw Edge
            for (i=0;i<_result[0].length;i++) {
                if (_result[0][i].LinkTo != -1) {
                    _str_src = "Devil " + i + " " + _result[0][i].Devil.Name;
                    _str_tar = "Devil " + _result[0][i].LinkTo + " " + _result[0][_result[0][i].LinkTo].Devil.Name;
                    nodeTest.add([
                        {elements:"edges", data: {source:_str_src, target: _str_tar}}
                    ]);
                }
            }
        } else {
            // error msg: cannot fused
        }
    }
    */

    ///*
    // Example code for fusion tree
    var _selTargetDevil = "薩麥爾";
    var _result = [];

    if (_selTargetDevil == "default") {	// Unselect
        // error msg: no devil selected
    } else {
        var _materials = ["哈索爾", "弗莫爾", "能天使", "塔姆林", "海奎特", "增長天", "美人魚", "巴風特", "佛鈕司"];    // UI needed. Pack from selected check boxes
        var _material_list = createMaterialList(_materials);
        _result = traversalTree(_selTargetDevil, fusionTree(_selTargetDevil, _material_list, 1))
        if (_result != null) {
            // cytoscape declairation w/o drawing
            var nodeTest = window.nodeTest = cytoscape({
                //在這個元素中繪製
                container: document.getElementById('nodeTest'),

                boxSelectionEnabled: false,
                autounselectify: true,

                
                layout: {
                    name: 'grid'
                },
                //這邊宣告繪製方式
                style: [
                {
                  selector: 'node',
                  style: {
                    'content': 'data(id)',
                    'text-opacity': 0.5,
                    'text-valign': 'center',
                    'text-halign': 'right',
                    'background-color': '#11479e'
                  }
                },

                {
                  selector: 'edge',
                  style: {
                    'curve-style': 'bezier',
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea'
                  }
                }
                ]
            });
            
            // Draw Node
            for (i=0;i<_result[0].length;i++) {
                _str = "Devil " + i + " " + _result[0][i].Devil.Name;
                nodeTest.add([
                    {elements:"nodes", data: {id: _str}}
                ]);
            }
            
            // Draw Edge
            for (i=0;i<_result[0].length;i++) {
                if (_result[0][i].Parent != -1) {
                    _str_src = "Devil " + _result[0][i].Parent + " " + _result[0][_result[0][i].Parent].Devil.Name;
                    _str_tar = "Devil " + i + " " + _result[0][i].Devil.Name;
                    nodeTest.add([
                        {elements:"edges", data: {source:_str_src, target: _str_tar}}
                    ]);
                    

                }
            }
            //重新設定輸出排列
            var layout = nodeTest.layout({
              //層級式排列
              name: 'circle'
            });

            layout.run(); 
                    
        } else {
            // error msg: cannot fused
        }
    }
    //*/
}

