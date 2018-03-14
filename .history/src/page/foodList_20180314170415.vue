<template>
  <div class="fillcontainer">
    <headTop></headTop>
    <div class="table-container">
      <el-table 
        @expand-change='expand'
        :data="tableData"
        :expand-row-keys='expendRow'
        :row-key="row => row.index"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description}}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.restaurant_address}}</span>
              </el-form-item>
              <el-form-item label="食物评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食物分类">
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="食品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="食品介绍"
          prop="description">
        </el-table-column>
        <el-table-column
          label="评分"
          prop="rating">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total,prev, pager, next"
        :total="count" style="margin-top:20px; margin-left:20px;">
      </el-pagination>

      <!--食物更新-->
      <el-dialog title="修改食物信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectFoods">
          <el-form-item label="食品名称" :label-width="formLabelWidth">
            <el-input v-model="selectFoods.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" :label-width="formLabelWidth">
            <el-input v-model="selectFoods.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" :label-width="formLabelWidth">
            <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.lable"
                :value="item.index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物图片" :label-width="formLabelWidth">
            <el-upload
              class="img-uploader"
              :action="baseUrl + '/v1/addimg/food'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="selectFoods.image_path" :src="baseImgPath + selectFoods.image_path" class="avatar">
              <i v-else class="el-icon-plus img-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
          <el-row style="text-align:center">
            <el-table
              :data="specsTable"
              style="width: 100%; border:1px solid #eee; border-bottom:none">
              <el-table-column
                prop="specs"
                label="规格">
              </el-table-column>
              <el-table-column
                prop="packing_fee"
                label="包装费">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="specDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-top:10px" @click="specsFormVisible = true">添加规格</el-button>
          </el-row>
        <span slot="footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateFoods">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="添加规格" :visible.sync="specsFormVisible">
        <el-form :model="specsForm" :rules="specsRules" ref="specsValidateForm">
          <el-form-item label="规格" prop="specs" :label-width="formLabelWidth">
            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="包装费" :label-width="formLabelWidth">
            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input-number v-model="specsForm.price" :min="20" :max="100"></el-input-number>
          </el-form-item>
        </el-form>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        <div slot="footer">
          <el-button @click="specsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addspecs">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import headTop from "@/components/headTop";
import {
  getFoodCount,
  getFoodList,
  getRestaurantDetail,
  getMenu,
  getMenuById,
  updateFoods,
  deleteFoods
} from "@/api/getData";
import { baseImgPath, baseUrl } from "@/config/env";
export default {
  data() {
    return {
      dialogFormVisible: false,
      restaurant_id: null,
      count: 0,
      offset: 0,
      limit: 20,
      currentPage: 1,
      tableData: [],
      selectFoods: {},
      formLabelWidth: "100px",
      imageUrl: null,
      selectIndex: null,
      selectMenu: {},
      specsFormVisible: false,
      baseImgPath,
      baseUrl,
      menuOptions: [],
      formIndex: [],
      expendRow: [],
      flag: false,
      specsForm: {
        specs: null,
        packing_fee: 0,
        price: 0
      },
      specsRules: {
        specs: [{ required: true, message: "规格不能为空", trigger: "blur" }]
      }
    };
  },
  components: {
    headTop
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    specsTable: function() {
      let specs = [];
      if (this.selectFoods.specfoods) {
        this.selectFoods.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });
        });
      }
      return specs;
    }
  },
  methods: {
    //获取食物数量
    async initData() {
      try {
        const countData = await getFoodCount({restaurant_id: this.restaurant_id});
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("数据读取失败");
        }
        this.getFoods();
      } catch (err) {
        console.log("数据读取失败", err);
      }
    },
    expand(row) {
      this.flag = !this.flag;
      if (this.flag) {
        this.getSelecteItemData(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    //获取食物列表
    async getFoods() {
      try {
        const foods = await getFoodList({
          offset: this.offset,
          limit: this.limit,
          restaurant_id: this.restaurant_id
        });
        this.tableData = [];
        if (foods) {
          foods.forEach((item, index) => {
            const tableData = {};
            tableData.name = item.name;
            tableData.item_id = item.item_id;
            tableData.restaurant_id = item.restaurant_id;
            tableData.rating = item.rating;
            tableData.month_sales = item.month_sales;
            tableData.description = item.description;
            tableData.image_path = item.image_path;
            tableData.specfoods = item.specfoods;
            tableData.category_id = item.category_id;
            tableData.index = index;
            this.tableData.push(tableData);
          });
        } else {
          throw new Error("数据读取失败");
        }
      } catch (err) {
        console.log("数据读取失败", err);
      }
    },
    handleEdit(index, row) {
      this.getSelecteItemData(row, "edit");
      this.dialogFormVisible = true;
    },
    specDelete(index) {
      this.specsTable.splice(index, 1);
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getMenu({
          restaurant_id: this.selectFoods.restaurant_id,
          allMenu: true
        });
        menu.forEach((item, index) => {
          this.menuOptions.push({
            value: item.id,
            lable: item.name,
            index
          });
        });
      } catch (err) {
        console.log("获取食品种类失败", err);
      }
    },
    async getSelecteItemData(row, type) {
      const restaurant = await getRestaurantDetail(row.restaurant_id);
      const category = await getMenuById(row.category_id);

      this.selectFoods = {
        ...row,
        ...{
          restaurant_name: restaurant.name,
          restaurant_address: restaurant.address,
          category_name: category.name
        }
      };
      
      this.selectMenu = { label: category.name, value: row.category_id };
      this.tableData.splice(row.index, 1, { ...this.selectFoods });
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
      if(type == 'edit' && this.restaurant_id != row.restaurant_id){
        this.getMenu();
      }
    },
    //删除食物列表
    async handleDelete(index, row) {
      const res = await deleteFoods(row.item_id);
      try {
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: res.success
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = this.limit * (val - 1);
      this.getFoods();
    },
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        this.selectFoods.image_path = res.image_path;
      } else {
        console.log("图片上传失败");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加规格
    addspecs() {
      this.$refs.specsValidateForm.validate(valid => {
        if (valid) {
          this.specsTable.push({ ...this.specsForm });
          this.specsFormVisible = false;
        } else {
          this.specsFormVisible = true;
        }
      });
    },
    //食品更新
    async updateFoods() {
      this.dialogFormVisible = false;
      try {
        const subData = {
          new_category_id: this.selectMenu.value,
          // specs: this.specsTable
        };
        console.log(this.selectFoods);
        
        const postData = { ...this.selectFoods, ...subData};
        console.log(postData);
        
        const res = await updateFoods(postData);
        if (res.status == 1) {
          this.$message({
            type: "success",
            message: res.success
          });
          this.getFoods();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } catch (err) {
        console.log("更新餐馆信息失败", err);
      }
    },
  }
};
</script>
<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.img-uploader .el-upload:hover {
  border-color: #409eff;
}
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
