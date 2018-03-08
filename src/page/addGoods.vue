<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-row style="margin-top:20px">
      <el-col :span="14" :offset="4">
        <header class="form-heaer">选择食物种类</header>
        <el-form :model="categoryForm" ref="categoryForm" class="form" label-width="110px">
          <el-row class="categoryForm">
            <el-form-item label="食物种类">
              <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%">
                <el-option 
                  v-for="item in categoryForm.categoryList" 
                  :key="item.value" 
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="add-category-row" :class="showAddCategory ? 'showEdit' : ''">
            <div class="add-category">
              <el-form-item label="食物种类" prop="name">
                <el-input v-model="categoryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitCategoryForm('categoryForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="add-category-button" @click="addCategoryFun">
            <i v-if="showAddCategory" class="el-icon-caret-top edit-icon"></i>
            <i v-else class="el-icon-caret-bottom edit-icon"></i>
            <span>添加食物种类</span>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="4">
        <header class="form-heaer">添加食物</header>
        <el-form :rules="foodRules" ref="foodForm" :model="foodForm" class="form" label-width="110px">
          <el-row class="foodForm">
            <el-form-item label="食品名称" prop="name">
              <el-input v-model="foodForm.name"></el-input>
            </el-form-item>
            <el-form-item label="食品活动" prop="activity">
              <el-input v-model="foodForm.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品详情" prop="description">
              <el-input v-model="foodForm.description"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/v1/addimg/food'"
                :show-file-list="false"
                :on-success="uploadImg"
                :before-upload="beforeImgUpload">
                <img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="foodForm.attributes" multiple placeholder="请选择">
                <el-option
                  v-for="item in attributes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品规格">
              <el-radio v-model="specs" label="one">单规格</el-radio>
              <el-radio v-model="specs" label="more">多规格</el-radio>
            </el-form-item>
            <el-row v-if="specs == 'one'">
              <el-form-item label="包装费">
                <el-input-number v-model="foodForm.packing_fee" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number v-model="foodForm.price" :min="0" :max="10000"></el-input-number>
              </el-form-item>
            </el-row>
            <el-row v-else style="text-align:center">
              <el-button type="primary" class="btn-dialog-specs" @click="openSpecsDialog">添加规格</el-button>
              <el-table :data="foodForm.specs" class="specsTable">
                <el-table-column label="规格" prop="specs"></el-table-column>
                <el-table-column label="包装费" prop="packing_fee"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteSpecs(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="confirmAddFood('foodForm')">确认食物添加</el-button>
            </el-form-item> 
          </el-row>
        </el-form>
        <el-dialog
          title="添加规格"
          :visible.sync="specsFormDialog">
          <el-form :model="specsForm" :rules="specsRules" ref="specsForm">
            <el-form-item label="规格" prop="specs" :label-width="labelWidth">
              <el-input v-model="specsForm.specs"></el-input>
            </el-form-item>
            <el-form-item label="包装费" prop="packing_fee" :label-width="labelWidth">
              <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="价格" prop="price" :label-width="labelWidth">
              <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="specsFormDialog = false">取消</el-button>
            <el-button type="primary" @click="addSpecs('specsForm')">确定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import headTop from "@/components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import { getCategoryList, addCategory, addFoods } from "@/api/getData";
export default {
  data() {
    return {
      labelWidth: "120px",
      restaurant_id: 1,
      categoryForm: {
        categoryList: [],
        categorySelect: "",
        name: "",
        description: ""
      },
      foodForm: {
        name: "",
        activity: "",
        description: "",
        image_path: "",
        attributes: [],
        specs: []
      },
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      attributes: [
        {
          value: "新",
          label: "新品"
        },
        {
          value: "招牌",
          label: "招牌"
        }
      ],
      foodRules: {
        name: [{ required: true, message: "请输入食品名称", trigger: "blur" }]
      },
      specsRules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      labelWidth: "100px",
      specsFormDialog: false, //多规格弹出框
      showAddCategory: false,
      specs: "one",
      baseUrl,
      baseImgPath
    };
  },
  components: {
    headTop
  },
  computed: {
    selectValue: function(val) {
      return (
        this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
      );
    }
  },
  created() {
    if (this.$route.query.restaurant_id) {
      this.restaurant_id = this.$route.query.restaurant_id;
    } else {
      this.$confirm("添加食品需要选择一个商铺，先去选择商铺吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        this.$router.push("shopList");
      });
    }
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const result = await getCategoryList(this.restaurant_id);
        if (result.status == 1) {
          result.category_list.map((item, index) => {
            item.name = item.name;
            item.value = index;
          });
          this.categoryForm.categoryList = result.category_list;
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    },
    submitCategoryForm(categoryForm) {
      this.$refs[categoryForm].validate(async (valid) => {
        if (valid) {
          const params = {
            name: this.categoryForm.name,
            description: this.categoryForm.description,
            restaurant_id: this.restaurant_id
          };
          try {
            const result = await addCategory(params);
            if (result.status == 1) {
              this.initData();
              this.categoryForm.name = "";
              (this.categoryForm.description = ""),
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
            } else {
              this.$message({
                type: "error",
                message: "必须填写食品类型名称"
              });
              return false;
            }
            this.showAddCategory = false;
          } catch (err) {
            console.log("添加食品分类失败", err);
          }
        } else {
          this.$notify({
            title: "错误",
            message: "检查是否输入错误",
            offset: 100
          });
        }
      });
    },
    //确认添加食物
    confirmAddFood(foodForm) {
      this.$refs[foodForm].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.foodForm,
            restaurant_id: this.restaurant_id,
            category_id: this.selectValue.id,
          }
          try {
            const result = await addFoods(params);
            if (result.status == 1) {
              this.$message({
                type: "success",
                message: result.success
              });
            } else {
              this.$message({
                type: "error",
                message: result.message
              });
            }
          } catch (err) {
            console.log(err);
          }
        }else{
          this.$notify.error({
            title: "错误",
            message: "检查是否输入错误",
            offset: 100
          })
        }
      });
    },
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory;
    },
    openSpecsDialog() {
      this.specsFormDialog = true;
    },
    uploadImg(res, file) {
      if (res.status == 1) {
        this.foodForm.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败");
      }
    },
    beforeImgUpload(file) {
      const isRightType = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    addSpecs(specsForm) {
      this.$refs[specsForm].validate((valid) => {
        if(valid){
          this.foodForm.specs.push({...this.specsForm});
          this.specsForm.specs = '';
          this.specsForm.packing_fee = 0;
          this.specsForm.price = 20;
          this.specsFormDialog = false;
        }else{
          this.specsFormDialog = true;
        }
      })
    },
    deleteSpecs(index, row) {
      this.foodForm.specs.splice(index,1);
    }    
  },
};
</script>
<style lang="less">
@import "../style/mixin.less";
.form-heaer {
  text-align: center;
}
.form {
  margin-bottom: 20px;
}
.categoryForm {
  margin-top: 10px;
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
.add-category-row {
  height: 0;
  background-color: #f9fafc;
  transition: all 0.4s;
  overflow: hidden;
}
.add-category {
  border: 1px solid #eaeefb;
  border-top: none;
  padding: 20px 30px 10px 10px;
}
.showEdit {
  height: 218px;
  transition: all 0.4s;
}
.add-category-button {
  line-height: 40px;
  border: 1px solid #eaeefb;
  border-top: none;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  text-align: center;
  &:hover {
    background: #f9fafc;
    span,
    .edit-icon {
      transition: all 0.4s;
      color: #20a0ff;
    }
  }
  span {
    .sc(14px,#ccc);
  }
  .edit-icon {
    .sc(16px, #ccc);
  }
}
.foodForm {
  border: 1px solid #eaeefb;
  border-radius: 6px;
  padding: 20px 30px 10px 10px;
  margin-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
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
.specsTable {
  width: 100%;
  border: 1px solid #ebeef5;
  border-bottom: none;
  margin-bottom: 20px;
}
.btn-dialog-specs {
  margin-bottom: 20px;
}
.el-table .one-row {
  background: oldlace;
}
.el-table .more-row {
  background: #f0f9eb;
}
</style>

