Public Class NCPlanCuentas
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_PlanCuentas(ByVal P_ID As String, ByVal p_FTVCTAS_CTLG_CODE As String, ByVal p_FTVCTAS_CODE As String, ByVal p_FTVCTAS_CUCO_CODE As String, ByVal p_FTVCTAS_NIPC_CODE As String, ByVal p_FTVCTAS_ESTADO_IND As String, ByVal p_USER As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PLAN_CUENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ID", P_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CTLG_CODE", p_FTVCTAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CODE", p_FTVCTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CUCO_CODE", p_FTVCTAS_CUCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_NIPC_CODE", p_FTVCTAS_NIPC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ESTADO_IND", p_FTVCTAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_USER, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_PlanCuentas(ByVal p_FTVCTAS_CTLG_CODE As String, ByVal p_FTVCTAS_CODE As String, ByVal p_FTVCTAS_NIPC_CODE As String, _
                                      ByVal p_FTVCTAS_CUCO_CODE As String, ByVal p_FTVCTAS_DESC As String, ByVal p_FTVCTAS_CENTRO_COSTO_IND As String, _
                                      ByVal p_FTVCTAS_DESTINO_IND As String, ByVal p_FTVCTAS_FECHA_INICIO As String, ByVal p_FTVCTAS_FECHA_TERMINO As String, _
                                      ByVal p_FTVCTAS_ENTR_DATOS As String, ByVal p_FTVCTAS_PREDEC_CODE As String, ByVal p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND As String, _
                                      ByVal p_FTVCTAS_CUENTA_MONETARIA_IND As String, ByVal p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND As String, ByVal p_FTVCTAS_ESTADO_IND As String, _
                                      ByVal p_FTVCTAS_USUA_ID As String, ByVal p_ITEMSCOUNT As Integer, ByVal p_ITEMSDETAIL As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PFC_CREAR_PLAN_CUENTAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CTLG_CODE", p_FTVCTAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CODE", p_FTVCTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_NIPC_CODE", p_FTVCTAS_NIPC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CUCO_CODE", p_FTVCTAS_CUCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_DESC", p_FTVCTAS_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CENTRO_COSTO_IND", p_FTVCTAS_CENTRO_COSTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_DESTINO_IND", p_FTVCTAS_DESTINO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_INICIO", p_FTVCTAS_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_FTVCTAS_FECHA_TERMINO = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_TERMINO", p_FTVCTAS_FECHA_TERMINO, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ENTR_DATOS", p_FTVCTAS_ENTR_DATOS, ParameterDirection.Input, 253))

            If p_FTVCTAS_PREDEC_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_PREDEC_CODE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_PREDEC_CODE", p_FTVCTAS_PREDEC_CODE, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND", p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CUENTA_MONETARIA_IND", p_FTVCTAS_CUENTA_MONETARIA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND", p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ESTADO_IND", p_FTVCTAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_USUA_ID", p_FTVCTAS_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT", p_ITEMSCOUNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL", p_ITEMSDETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_JSON", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = cmd1.Parameters("@p_JSON").Value
            msg(2) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_PlanCuentas(ByVal P_ID As String,
                                      ByVal p_FTVCTAS_CTLG_CODE As String, ByVal p_FTVCTAS_CODE As String, ByVal p_FTVCTAS_NIPC_CODE As String,
                                      ByVal p_FTVCTAS_CUCO_CODE As String, ByVal p_FTVCTAS_DESC As String, ByVal p_FTVCTAS_CENTRO_COSTO_IND As String,
                                      ByVal p_FTVCTAS_DESTINO_IND As String, ByVal p_FTVCTAS_FECHA_INICIO As String, ByVal p_FTVCTAS_FECHA_TERMINO As String,
                                      ByVal p_FTVCTAS_ENTR_DATOS As String, ByVal p_FTVCTAS_PREDEC_CODE As String, ByVal p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND As String,
                                      ByVal p_FTVCTAS_CUENTA_MONETARIA_IND As String, ByVal p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND As String, ByVal p_FTVCTAS_ESTADO_IND As String,
                                      ByVal p_FTVCTAS_USUA_ID As String, ByVal p_ITEMSCOUNT As Integer, ByVal p_ITEMSDETAIL As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand


            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PLAN_CUENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ID", P_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CTLG_CODE", p_FTVCTAS_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CODE", p_FTVCTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_NIPC_CODE", p_FTVCTAS_NIPC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CUCO_CODE", p_FTVCTAS_CUCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_DESC", p_FTVCTAS_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CENTRO_COSTO_IND", p_FTVCTAS_CENTRO_COSTO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_DESTINO_IND", p_FTVCTAS_DESTINO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_INICIO", p_FTVCTAS_FECHA_INICIO, ParameterDirection.Input, 253))

            If p_FTVCTAS_FECHA_TERMINO = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_TERMINO", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_FECHA_TERMINO", p_FTVCTAS_FECHA_TERMINO, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ENTR_DATOS", p_FTVCTAS_ENTR_DATOS, ParameterDirection.Input, 253))

            If p_FTVCTAS_PREDEC_CODE = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_PREDEC_CODE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_PREDEC_CODE", p_FTVCTAS_PREDEC_CODE, ParameterDirection.Input, 253))
            End If

            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND", p_FTVCTAS_AJUSTE_DIF_CAMBIO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_CUENTA_MONETARIA_IND", p_FTVCTAS_CUENTA_MONETARIA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND", p_FTVCTAS_ACTIV_FLUJO_EFECTVO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_ESTADO_IND", p_FTVCTAS_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVCTAS_USUA_ID", p_FTVCTAS_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSCOUNT", p_ITEMSCOUNT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEMSDETAIL", p_ITEMSDETAIL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_JSON", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = cmd1.Parameters("@p_JSON").Value
            msg(2) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fListarPC(ByVal p_CTLG_CODE As String, ByVal p_PTVNIPL_CODE As String, ByVal p_NIVEL As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_PC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CODE", p_PTVNIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVEL", p_NIVEL, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListar_PCXEmpresa(ByVal p_CodeEmpresa As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("sp_PlacCtaXEmpresa", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CodeEmpresa, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fListar_NivelesXEmpresa(ByVal pEmpresa As String, ByVal p_PlanCtas As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("sp_PlanCtasXNiveles", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", pEmpresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_PlanCtas, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function


    Public Function LISTAR_CONCEPTO_GASTO(ByVal p_CODE As String, ByVal p_ESTADO As String, ByVal p_TIPO As String, Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_LISTAR_CONCEPTO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function



    Public Function LISTAR_CUENTAS_CONTABLES_X_NIVEL(ByVal p_NUM_CUENTA As String, ByVal p_NIVEL As Integer, ByVal p_CLASE_CUENTA As String, ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PLAN_CUENTAS_X_NIVELES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_CUENTA", p_NUM_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NIVEL", p_NIVEL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLASE_CUENTA", p_CLASE_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw ex
        End Try
    End Function



    Public Function Crear_Concepto_Gasto(ByVal p_DESC As String,
                                    ByVal p_DEPEND_CODE As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                    ByVal p_TIPO_MOV As String, ByVal p_CTLG_CODE As String, ByVal p_CODIGO_CTA As String, ByVal p_TIPO_BIEN As String,
                                    ByVal p_CODIGO_DETRACCION As String, ByVal p_PORCENTAJE_DETRACCION As String, Optional ByRef p_DESC_ADICIONAL As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_CONCEPTO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_DEPEND_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_MOV", p_TIPO_MOV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_CTA", p_CODIGO_CTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_ADICIONAL", p_DESC_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_DETRACCION", p_CODIGO_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_GRUP_CODE_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




    Public Function Actualizar_Concepto_Gasto(ByVal p_CODE As String, ByVal p_DESC As String,
                                   ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String,
                                   ByVal p_CTLG_CODE As String, ByVal p_CTA_CONT As String,
                                   ByVal p_TIPO_BIEN As String, ByVal p_CODIGO_DETRACCION As String, ByVal p_PORCENTAJE_DETRACCION As String,
                                   Optional ByRef p_DESC_ADICIONAL As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_CONCEPTO_GASTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTA_CONT", p_CTA_CONT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_ADICIONAL", p_DESC_ADICIONAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_BIEN", p_TIPO_BIEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_DETRACCION", p_CODIGO_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Eliminar_Concepto_Gasto(ByVal p_CODE As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_ELIMINAR_CONCEPTO_GASTO", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    


End Class
